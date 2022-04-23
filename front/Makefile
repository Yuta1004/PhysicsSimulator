# Settings to start container
IMAGE := node:18
CURDIR := $(shell pwd)
WORKDIR := /workdir

# Settings for Application
PORT := 3000

run:
	make -C ../core
	docker run --rm -it -w $(WORKDIR)/front -p 3000:$(PORT) -v $(CURDIR):/$(WORKDIR)/front $(IMAGE) npm start
