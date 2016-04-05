# Collaborative Stories Epic

Summary: Collaborative Stories is an app that lets users open "stories" where users can write "snippets" to the stories. 

In the nav bar, clicking on "Collaborative Stories" will take the user to the home page which is the story browsing page. 

Registering is quick and easy, just enter a username, password, and confirm password. Hit "New Story" to go to the create story page. After entering the title and opening, hit publish to create the story and redirect to home. Enter a story by hitting "Read". To add a snippet to the story, type into the text area and hit "Publish".

Stories are listed in the home page. There are open stories where the story starter welcomes all users to write snippets. And there are closed stories where the story starter would rather have certain users write snippets to it. In the home page, the open stories are green and the closed stories are red.  

All registered users have a profile. Logged in users can click on the welcome button on the navbar to access their profile. Users can also access the profiles of other users, but can only edit their own profiles. 

Logged in users can add stories to their favorite stories collection by clicking the heart icon on the story they like. To remove from the collection, click on the empty heart icon. 

When browsing stories, users can narrow down the stories displayed on the homepage by entering a keyword on the Search input. 

Logged in users may edit or delete the stories they have opened by: 
Entering the story and clicking on the Edit Story button. When that button is clicked, the Delete Story Button would appear. Click on that, and the Confirm delete button would appear. Clicking the Confirm delete button would remove the story along with all the snippets. 

Logged in users may edit or delete the snippets they have published by: 
Finding the snippet in the story, and clicking the small pencil icon. This will bring the user to the snippet detail view. Clicking on the trashbin icon will make the Confirm delete button appear. Clicking on the Confirm delete button will remove the snippet. 
 

Deployed on Heroku: https://storiesepic.herokuapp.com/

To run locally, `git clone https://github.com/CoolConfucius/stories-epic` in a local directory. To begin, enter `npm run setup`.  This will install all dependencies. In your terminal, open multiple tabs. In one tab, run `mongod` and in another run `gulp`. After that, you can start your server with `npm start` or `nodemon`.
