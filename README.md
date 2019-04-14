# image_management
This is image management system

# RUNNING PROJECT INFORMATION

1> After taking clone in the image_management folder go to the client folder using the terminal (command prompt for windows) and install dependencies by using the command "npm install" similarly for the server after going to server install dependencies using the command "npm install". 

2> To run project in development mode - 
Currently project is set for development mode as NODE_ENV is set to "development" in .env file under server folder.
	Client - After going into client run command "ng serve".
	Server - to run node server start command "npm start".

3> To run project in production mode - 
Set NODE_ENV  to "production" in .env file under server folder.
    Client - After going into client run command "ng build".(As we are using local API's so no need to use command ng build --prod)
    Server - to run node server start command "npm start".
I have verified it by running on NGINX server.

NOTE: In development mode as we are storing images in the assets folder inside the client folder so every time we upload the image or delete the image the page reload itself as AOT compiler detects the change in the assets folder ,if we run it in production enviroment so it doesn't occur.

# FUNCTIONALITY IMPLEMENTATION INFORMATION

1> When we select images we can see the preview of those images below and we can remove any image from selected images by using button present below.

2> If you select any other image other than jpg, png and jpeg format so there will be an alert message.

3> When you click on the submit button the image will be uploaded to the assets folder in client -> src. At the same time entry regarding it will be made into the collection of the database. To allow similar images to be saved multiple times so here we are changing its name with the current timestamp along with the extension, We are using post type API with the URL of "http://localhost:3000/file"

4> Uploaded images will be shown below that we are getting from "http://localhost:3000/file" get API.

5> Below that list there will be a delete button that we can use for deleting uploaded images here we are deleting database entry along with an image from the assets folder, by using delete type API with the URL of "http://localhost:3000/file" here we pass the id of the image as query parameter.
