BUILD_DATE = $(shell date +%Y_%m_%d_%H_%M_%S)
# BUILD_DATE = latest

REGISTRY := registry.igoryusha.love/fastcup-enhancer

grd:
	make build
	make push

build:
	make -j 3 build.nestjs build.nginx build.write

build.nestjs:
	DOCKER_BUILDKIT=1 docker build \
		--platform linux/amd64 \
		-f ./docker/nestjs/prod.Dockerfile ./nestjs \
		-t ${REGISTRY}/nestjs:build_${BUILD_DATE}

build.nginx:
	DOCKER_BUILDKIT=1 docker build \
		--platform linux/amd64 \
		-f ./docker/nginx/Dockerfile . \
		-t ${REGISTRY}/nginx:build_${BUILD_DATE}

build.write:
	echo ${BUILD_DATE} > last_build_date.txt

push:
	make -j 2 push.nestjs push.nginx

push.nestjs:
	docker push ${REGISTRY}/nestjs:build_$(shell cat last_build_date.txt)

push.nginx:
	docker push ${REGISTRY}/nginx:build_$(shell cat last_build_date.txt)
