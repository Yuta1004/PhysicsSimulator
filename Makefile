run:
	docker-compose up

build:
	make -C core
	docker-compose build
