IMAGE_NAME=finizens-fullstack-challenge
PORTFOLIOS_BACKEND_CONTAINER_NAME=portfolios_backend
PORTFOLIOS_FRONTEND_CONTAINER_NAME=portfolios_frontend
ENV_FILE_DEV=.env.dev
ENV_FILE_PROD=.env.prod
ENV_FILE_TEST=.env.test

setTestEnv:
	sudo cp $(ENV_FILE_TEST) .env

setDevEnv:
	sudo cp $(ENV_FILE_DEV) .env

setProdEnv:
	sudo cp $(ENV_FILE_PROD) .env

install:
	@docker-compose run --rm $(PORTFOLIOS_BACKEND_CONTAINER_NAME) npm install $(ARGS)
	@docker-compose run --rm $(PORTFOLIOS_BACKEND_CONTAINER_NAME) chown -R node:node .

	@docker-compose run --rm $(PORTFOLIOS_FRONTEND_CONTAINER_NAME) npm install $(ARGS)
	@docker-compose run --rm $(PORTFOLIOS_FRONTEND_CONTAINER_NAME) chown -R node:node .

.PHONY: build
build:
	@docker build -t $(IMAGE_NAME):dev .

# Run tests
test:
	@docker-compose run --rm $(PORTFOLIOS_BACKEND_CONTAINER_NAME) npm run test

test-unit-watch:
	@docker-compose run --rm $(PORTFOLIOS_BACKEND_CONTAINER_NAME) npm run test:unit:watch

# Portfolios - Backend
start-local-portfolios-backend: setTestEnv
	@docker-compose run --rm --service-ports $(PORTFOLIOS_BACKEND_CONTAINER_NAME) npm run dev:portfolios:backend

# Portfolios - Frontend
start-local-portfolios-frontend: setTestEnv
	@docker-compose run --rm --service-ports $(PORTFOLIOS_FRONTEND_CONTAINER_NAME) npm run start:portfolios:frontend

# Clean containers
clean:
	@docker-compose down --rmi local --volumes --remove-orphans

# Dummy server
install-dummy-server: 
	echo "Installing mock server for frontend development purposes..."
	cd frontend_server && npm install;
	echo "Finished, run 'make start' for starting the mocked server"

start-dummy-server:
	echo "Launching mocked server, visit http://localhost:3000"
	cd frontend_server && npm start
