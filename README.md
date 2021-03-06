# FitFactoryAngularProject
## Overall Description
The project is created in order to help people learn how to live and maintain a healthy lifestyle. It contains general information about macronutrients, workout types, calorie intakes, contact page, authentication and CRUD functionality and so on ...

## Below will be the functionalities of the project

* Firebase CRUD
  * Users can create, update, read and delete their own diets and workouts.
  * The process includes a dialog container which holds the form for inserting the desired data.
  * Once the data is successfully inserted, the user gets a custom alert message, showing a success message.
  * Once the diet/workout is created , we get the option to upvote/downvote the post ( simillar to Stackoverflow system ) , by clicking on the voting arrows.
  * The diet/workout can be edited/deleted only by its creator, therefore protecting other posts from harmful actions.
  * 
* Firebase Authentication
  * People who want to use the application, should first register and join the project via email and password.
  * Once the user has registered successfully , he will be redirected to the home page. The process is similar to the sign in - when the user log in he is redirected once again to the home page.
  * If the user forgets his/her password, he/she can navigate to reset password , where he/she can insert its email , receive one and navigate via the link to a small window, where a new password should be written down.
  * 
* Daily Calorie Intake
  * Built-in daily calorie calculator , which calculates the user's calories for the day, based on their gender, age, height, weight, activity level and purpose of calorie intake.
  * 
## Services:
* Firebase crud service - holds the logic for:
  *getting the items
  *adding an item
  *updating an item
  *deleting an item
* Firebase authentication service - holds the logic for:
  *sign-in functionality
  *sign-up functionality
  *logout functionality
  *get user id and store in localStorage for further use ( user-claims )
## External style and animation libraries:
* Sweet Alert - fully-customizable alert message with status icon, title text, content text, buttons, etc ...
* AnimateCSS - CSS library with prepared animations for making the project more lively and interesting
* Angular Material - Material Design components for Angular, prepared and coming up with built-in functionality 
* Font Awesome -  icon set and toolkit for using different kind of icons in the project.
