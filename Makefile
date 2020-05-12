.DEFAULT_GOAL := help

RED=\033[31m
CYAN=\033[36m
YELLOW=\033[33m
GREEN=\033[32m
DEFAULT=\033[0m

ENV := development
DOCKER := true
PROJECT_ROOT := $(shell pwd)
NODE_MODULES := ./node_modules/.bin
DOCKER_IMAGE := richardregeer/google-drive-sync
VERSION := $(shell cat VERSION)

ifeq ($(DOCKER),true)
	START_COMMAND := docker run --rm -it -v ${PROJECT_ROOT}:/development raptor:development 
else 
	START_COMMAND := 
endif

.PHONY: help
help:
	@echo -e 'To run a task: ${GREEN}make [task_name]${DEFAULT}'
	@echo "\tExample: make test ENV='production'"
	@echo ''
	@echo 'By default the task will run in development environment mode using docker.'
	@echo -e 'The environment can be changed by passing ${YELLOW}ENV=[development|production|ci]${DEFAULT}.'
	@echo -e 'To run a command on the host without docker use argument ${YELLOW}DOCKER=false${DEFAULT}.'
	@echo "\tExample: make test ENV=development DOCKER=false"
	@echo ''
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%s%-30s%s %s\n", "${CYAN}", $$1, "${DEFAULT}",$$2}'

.PHONY: install
install: ## Install Raptor for a specific environment setup. Possible environments ENV=development|ci
ifeq ($(ENV),development)
	@echo -e '${CYAN}Install Raptor for the development environment${DEFAULT}'
	make docker_build ENV=development
	${START_COMMAND} npm install
endif
ifeq ($(ENV),ci)
	@echo -e '${CYAN}Install Raptor for the ci environment${DEFAULT}'
	npm install
endif

.PHONY: docker_build
docker_build: ## Build Raptor docker image. Possible environments ENV=development
ifeq ($(ENV),production)
	@echo -e '${CYAN}Build Raptor development docker image: raptor:development${DEFAULT}'
	docker build -t raptor:development docker/development
else
	@echo -e '${CYAN}Build Raptor development docker image: raptor:development${DEFAULT}'
	docker build -t raptor:development docker/development
endif

.PHONY: build
build: ## Build the google drive sync image.
	docker build \
		-t ${DOCKER_IMAGE}:development \
		-t ${DOCKER_IMAGE}:ci \
		-t ${DOCKER_IMAGE}:production \
		-t ${DOCKER_IMAGE}:${VERSION} \
		-t ${DOCKER_IMAGE}:latest .

.PHONY: publish
publish: ## Pubish docker image to docker hub only available on ci environment.
ifneq ($(ENV),ci)
	$(error Required ENV='ci')
endif
	docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
	docker push ${DOCKER_IMAGE}:${VERSION}
	docker push ${DOCKER_IMAGE}:latest
	
.PHONY: lint
lint: ## Check the codestyle of the complete project.
	${START_COMMAND} ${NODE_MODULES}/eslint .

.PHONY: test
test: test_unit test_integration## Run all the tests of the complete project.

# .PHONY: test_unit
# test_unit: ## Run all the unit tests of the complete project.
# 	${START_COMMAND} ${NODE_MODULES}/ava --verbose **/unit/**/*.js **/unit/**/**/*.js

# .PHONY: test_coverage
# test_coverage: ## Calculate the unit test coverage of the complete project.
# 	${START_COMMAND} ${NODE_MODULES}/nyc --reporter=text --reporter=text-summary --reporter=html \
# 	${NODE_MODULES}/ava --verbose **/unit/**/*.js **/unit/**/**/*.js \
# 	**/integration/**/*.js **/integration/**/**/*.js

# .PHONY: test_integration
# test_integration: ## Run all the integration tests of the complete project.
# 	${START_COMMAND} ${NODE_MODULES}/ava --verbose **/integration/**/*.js **/integration/**/**/*.js

# .PHONY: test_acceptance
# test_acceptance: ## Run all the acceptance tests of the complete project.
# 	${START_COMMAND} ${NODE_MODULES}/ava --verbose --serial **/acceptance/*.js