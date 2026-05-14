from __future__ import annotations

import json
import urllib.request
from pathlib import Path

from pyproj import Transformer


SOURCE_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
OUTPUT_PATH = Path(__file__).resolve().parents[1] / 'games' / 'country-locator' / 'map-data.js'
CANVAS_WIDTH = 1000
CANVAS_HEIGHT = 600
PADDING = 12

INTERACTIVE_IDS = {
    'US', 'CA', 'MX', 'CU', 'BR', 'AR', 'CO', 'CL', 'PE', 'VE',
    'GB', 'FR', 'DE', 'IT', 'ES', 'PT', 'SE', 'NO', 'GR', 'PL',
    'NL', 'CH', 'IE', 'DK', 'EG', 'ZA', 'NG', 'KE', 'MA', 'DZ',
    'GH', 'ET', 'CN', 'IN', 'JP', 'KR', 'RU', 'ID', 'TH', 'SA',
    'TR', 'IR', 'AU', 'NZ',
}

ID_OVERRIDES = {
    'France': 'FR',
    'Norway': 'NO',
}


def fetch_geojson() -> dict:
    with urllib.request.urlopen(SOURCE_URL) as response:
        return json.load(response)


def iter_rings(geometry: dict) -> list[list[tuple[float, float]]]:
    geometry_type = geometry.get('type')
    coordinates = geometry.get('coordinates', [])

    if geometry_type == 'Polygon':
        return [ring for ring in coordinates if ring]
    if geometry_type == 'MultiPolygon':
        return [ring for polygon in coordinates for ring in polygon if ring]

    return []


def build_projection(features: list[dict]) -> tuple[Transformer, float, float, float, float]:
    transformer = Transformer.from_crs(
        'EPSG:4326',
        '+proj=eqearth +datum=WGS84 +units=m +no_defs',
        always_xy=True,
    )

    min_x = float('inf')
    min_y = float('inf')
    max_x = float('-inf')
    max_y = float('-inf')

    for feature in features:
        for ring in iter_rings(feature['geometry']):
            for lon, lat in ring:
                x, y = transformer.transform(lon, lat)
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)

    return transformer, min_x, min_y, max_x, max_y


def format_number(value: float) -> str:
    rounded = round(value, 1)
    if abs(rounded) < 0.05:
        rounded = 0.0
    return f'{rounded:.1f}'


def build_path(rings: list[list[tuple[float, float]]], project_point) -> str:
    commands: list[str] = []

    for ring in rings:
        if not ring:
            continue

        first_x, first_y = project_point(ring[0])
        commands.append(f'M{format_number(first_x)} {format_number(first_y)}')

        for point in ring[1:]:
            x, y = project_point(point)
            commands.append(f'L{format_number(x)} {format_number(y)}')

        commands.append('Z')

    return ' '.join(commands)


def main() -> None:
    source = fetch_geojson()

    features: list[dict] = []
    for feature in source.get('features', []):
        properties = feature.get('properties', {})
        country_id = ID_OVERRIDES.get(properties.get('name'), properties.get('ISO3166-1-Alpha-2'))
        geometry = feature.get('geometry')

        if not country_id or len(country_id) != 2 or geometry is None:
            continue
        if geometry.get('type') not in {'Polygon', 'MultiPolygon'}:
            continue

        features.append(feature)

    transformer, min_x, min_y, max_x, max_y = build_projection(features)

    available_width = CANVAS_WIDTH - (PADDING * 2)
    available_height = CANVAS_HEIGHT - (PADDING * 2)
    scale = min(available_width / (max_x - min_x), available_height / (max_y - min_y))
    offset_x = (CANVAS_WIDTH - ((max_x - min_x) * scale)) / 2
    offset_y = (CANVAS_HEIGHT - ((max_y - min_y) * scale)) / 2

    def project_point(point: tuple[float, float]) -> tuple[float, float]:
        x, y = transformer.transform(point[0], point[1])
        normalized_x = ((x - min_x) * scale) + offset_x
        normalized_y = ((max_y - y) * scale) + offset_y
        return normalized_x, normalized_y

    background_countries: list[dict] = []
    interactive_countries: list[dict] = []

    for feature in features:
        properties = feature['properties']
        country_id = ID_OVERRIDES.get(properties['name'], properties['ISO3166-1-Alpha-2'])
        country = {
            'id': country_id,
            'name': properties['name'],
            'path': build_path(iter_rings(feature['geometry']), project_point),
        }

        if country_id in INTERACTIVE_IDS:
            interactive_countries.append(country)
        else:
            background_countries.append(country)

    background_countries.sort(key=lambda country: country['id'])
    interactive_countries.sort(key=lambda country: country['id'])

    payload = {
        'width': CANVAS_WIDTH,
        'height': CANVAS_HEIGHT,
        'backgroundCountries': background_countries,
        'countries': interactive_countries,
    }

    output = (
        '/* Generated from datasets/geo-countries (Natural Earth, public domain) '\
        'using an Equal Earth projection. */\n'
        f'window.COUNTRY_LOCATOR_MAP={json.dumps(payload, separators=(",", ":"))};\n'
    )
    OUTPUT_PATH.write_text(output, encoding='utf-8')

    print(f'Wrote {OUTPUT_PATH}')
    print(f'Background countries: {len(background_countries)}')
    print(f'Interactive countries: {len(interactive_countries)}')


if __name__ == '__main__':
    main()