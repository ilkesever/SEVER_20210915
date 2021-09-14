docker run -d -p 2717:27017 -v ./mongo/data/db --name mymongo mongo:latest
cd .\server\
node .\server.js
cd ..\client\
npm install --silent
npm start