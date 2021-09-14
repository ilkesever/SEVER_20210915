Following commands should run at root level of the project in order to serve project at http://localhost:3000

****Docker, npm and node must be installed before these steps ****

1) docker run -d -p 2717:27017 -v ./mongo/data/db --name mymongo mongo:latest

2) cd .\server\

3) npm install --silent

4) node .\server.js  
(leave node terminal open to be able to follow requests to backend)

****new terminal****
5) cd ..\client\

6) npm install --silent

7) npm start