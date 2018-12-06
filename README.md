Music Sessions

A social music listening experience with Spotify. 
This app allows a user to connect to their Spotify account and host a Spotify playback "Session". Other users who follow the Host can join the host's "session" allowing the Host to be in the drivers seat for the listening experience of all the connected listeners.

Back-End:
This app uses Node.js with MongoDB for the back end. 
It uses an express server to handle RESTful api calls to the database and to Spotify Authentication. 
The server also uses Socket.io to create sockets to link a host user to the listening users.
Node.js uses Pug/Jade templates to handle simple views and to as a template to host Reactjs scripts.

Database: 
MongoDB with mongoose package. The MongoDB database is hosted on the cloud.mongodb on an AWS dev cluster.

FrontEnd:
The app uses React with react-router to handle client side routing on the frontend. The react scripts are imported into Pug templates.

Current Development Stage: 
1. Working express backend that allows user to login with Spotify.
2. Basic front-end that initializes the Spotify SDK and allows users to play music on the browser via Spotify connect from their mobile phone.
3. Socket set up to communicate from client to server and server to client.
4. Created API calls to GET and POST user information and defined User model.
