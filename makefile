install: 
	echo "Installing mock server for frontend development purposes..."
	cd frontend_server && npm install;
	cd frontend_server && npm start
	echo "Finished, run 'make start' for starting the mocked server"

start:
	cd frontend_server && npm start
