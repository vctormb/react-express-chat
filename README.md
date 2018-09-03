## About the project
I've created this chat based on Discord interface just for fun using styled components. The main goal of this project is to learn more about communicating users in real time using React and Socket.IO using Node Express.  

Some cool patterns were used to organize the app's logic such as Redux, Context API and Render Props.

Live demo: https://react-chat-express.herokuapp.com


## Running the back-end
```
yarn install # 1. install the dependencies
yarn dev # 2. run the project
```
To connect with your Mongo's database in development mode, you need to create a file called ```development.js``` inside ```config``` folder and put your Mongo's connection. E.g.:
```
module.exports = {
 mongoUri: `mongodb://<dbuser>:<password>@ds243501.mlab.com:43501/react-chat-express`
}
```

## Running the front-end
```
cd client # 1. navigate into client's folder
yarn install # 2. install the dependencies
yarn start # 3. run the project
```

## Screenshots
![Heroes Catalog](https://github.com/vctormb/react-express-chat/blob/master/docs/images/Login.png)
![Heroes Catalog](https://github.com/vctormb/react-express-chat/blob/master/docs/images/Message.png)
![Heroes Catalog](https://github.com/vctormb/react-express-chat/blob/master/docs/images/Message1to1.png)

## TODO
- The back-end needs improvement
- Add “{user} is typing” functionality
- Add authentication with token
- Add public channel for everyone
- etc...
