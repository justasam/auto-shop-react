
BUILD_CONTEXT=./deploy
NPM_BUILD_CONTEXT=./build
COMPILED_WEB_DIR=./web
SERVER=3.10.219.57
SERVER_USER=ubuntu

.PHONY: go-build
go-build:
	@echo "Build go binaries..."
	go build -o $(BUILD_CONTEXT)/autoshop

.PHONY: npm-build
npm-build:
	@echo "Building react scripts..."
	rm -rf $(COMPILED_WEB_DIR)
	npm run build && mv $(NPM_BUILD_CONTEXT) $(COMPILED_WEB_DIR)

.PHONY: npm-install
npm-install:
	@echo "Installing dependencies from node..."
	npm install

.PHONY: build
build: npm-build go-build
	mkdir -p $(BUILD_CONTEXT)
	cp -r $(COMPILED_WEB_DIR) $(BUILD_CONTEXT)

.PHONY: deploy
deploy:
	@echo "Deploying to server..."
	scp -r -i ${PEM_FILE} $(BUILD_CONTEXT)/* $(SERVER_USER)@$(SERVER):/home/ubuntu/webserver/

.PHONY: clean
clean:
	rm -rf $(NPM_BUILD_CONTEXT) $(BUILD_CONTEXT) $(COMPILED_WEB_DIR)
