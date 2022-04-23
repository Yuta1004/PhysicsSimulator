IMAGE := rust:1.60.0-wasm
CURDIR := $(shell pwd)

build:
	docker run --rm -it -v $(CURDIR):/workdir rust:1.60.0-wasm wasm-pack build --scope kepler-core

build-image:
	docker build -t rust:1.60.0-wasm .
