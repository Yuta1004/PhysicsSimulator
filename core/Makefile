# Settings to start container
IMAGE := rust:1.60.0-wasm
CURDIR := $(shell pwd)

build:
	docker run --rm -it -v $(CURDIR):/workdir $(IMAGE) wasm-pack build --scope kepler-core --target web

build-image:
	docker build -t $(IMAGE) .

