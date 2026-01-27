.PHONY: help up down build logs

help: ## Mostra os comandos disponíveis
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Inicia a aplicação com Docker
	docker-compose up --build

down: ## Para e remove os containers
	docker-compose down

build: ## Constrói as imagens Docker
	docker-compose build

logs: ## Mostra os logs
	docker-compose logs -f

