install: 
	echo "Installing mock server for frontend development purposes..."
	cd frontend_server && npm install;
	cd frontend_server && npm start
	echo "Finished, run 'make start-server'"

start-server:
	cd frontend_server && npm start
