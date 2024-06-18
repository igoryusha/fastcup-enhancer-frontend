up:
	docker compose up -d

BUILD_DATE = $(shell date +%Y_%m_%d_%H_%M_%S)

IMAGE = fastcup-enhancer-frontend-prod-build:$(TAG)

prod:
	make build TAG=$(BUILD_DATE)
	make copy-archive TAG=$(BUILD_DATE)

build:
	docker build \
		--tag $(IMAGE) \
		-f ./Dockerfile \
		.

copy:
	export SYNC_DOCKER_ID=`docker run -d ${IMAGE} true`; \
	rm -rf ${COPY_TO_PATH}; \
	docker cp $${SYNC_DOCKER_ID}:${COPY_FROM_PATH} ${COPY_TO_PATH}; \
	docker rm $${SYNC_DOCKER_ID}
	
copy-archive:
	make copy TAG=$(TAG) COPY_TO_PATH="./archive.zip" COPY_FROM_PATH="/var/www/extension/dist/archive.zip"
