HOST_IP ?= 0.0.0.0
HOST_PORT ?= 8080
IMAGE_NAME ?= alpha-collection:local
CONTAINER_NAME ?= alpha-collection
KUBE_NAMESPACE ?= alpha-collection
K8S_APP_NAME ?= alpha-collection
K8S_IMAGE ?= ghcr.io/aghafori/the_alpha_collection:latest

.PHONY: docker-build docker-run docker-stop docker-restart docker-logs docker-status k8s-deploy k8s-delete k8s-restart k8s-status k8s-logs

docker-build:
	docker build -t $(IMAGE_NAME) .

docker-run: docker-build
	docker rm -f $(CONTAINER_NAME) >/dev/null 2>&1 || true
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(HOST_IP):$(HOST_PORT):80 \
		--restart unless-stopped \
		$(IMAGE_NAME)

docker-stop:
	docker rm -f $(CONTAINER_NAME)

docker-restart: docker-stop docker-run

docker-logs:
	docker logs -f $(CONTAINER_NAME)

docker-status:
	docker ps --filter name=$(CONTAINER_NAME) --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'

k8s-deploy:
	kubectl create namespace $(KUBE_NAMESPACE) --dry-run=client -o yaml | kubectl apply -f -
	kubectl apply -n $(KUBE_NAMESPACE) -f k8s/
	kubectl set image deployment/$(K8S_APP_NAME) $(K8S_APP_NAME)=$(K8S_IMAGE) -n $(KUBE_NAMESPACE)
	kubectl rollout status deployment/$(K8S_APP_NAME) -n $(KUBE_NAMESPACE)

k8s-delete:
	kubectl delete namespace $(KUBE_NAMESPACE) --ignore-not-found=true

k8s-restart:
	kubectl rollout restart deployment/$(K8S_APP_NAME) -n $(KUBE_NAMESPACE)
	kubectl rollout status deployment/$(K8S_APP_NAME) -n $(KUBE_NAMESPACE)

k8s-status:
	kubectl get all -n $(KUBE_NAMESPACE)

k8s-logs:
	kubectl logs deployment/$(K8S_APP_NAME) -n $(KUBE_NAMESPACE) --follow
