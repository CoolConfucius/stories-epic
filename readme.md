# Collaborative Stories Epic

Summary: Collaborative Stories is an app that lets users open "stories" where users can write "snippets" to the stories. 

Registering is quick and easy, just enter a username, password, and confirm password. 

Stories are listed in the home page. There are open stories where the story starter welcomes all users to write snippets. And there are closed stories where the story starter would rather have certain users write snippets to it. In the home page, the open stories are green and the closed stories are red.  

All registered users have a profile. Logged in users can click on the welcome button on the navbar to access their profile. Users can also access the profiles of other users, but can only edit their own profiles. 

Logged in users can add stories to their favorite stories collection by clicking the heart icon on the story they like. To remove from the collection, click on the empty heart icon. 

When browsing stories, users can narrow down the stories displayed on the homepage by entering a keyword on the Search input. 

Logged in users may edit or delete the stories they have opened by: 
Entering the story and clicking on the Edit Story button. When that button is clicked, the Delete Story Button would appear. Click on that, and the Confirm delete button would appear. Clicking the Confirm delete button would remove the story along with all the snippets. 



Enter the description and due date of a task into the input. Hit the Add Todo button to add the task to the list. Hit on the headers to sort the todos. Hit the same header again to reverse the order of the sorting. Toggle the completion status of the task by hitting the button under the header "Complete?". Delete a todo item by hitting the trashbin icon. 

To run locally, `git clone https://github.com/CoolConfucius/stories-epic` in a local directory. To begin, enter `npm run setup`.  This will install all dependencies. In your terminal, open multiple tabs. In one tab, run `mongod` and in another run `gulp`. After that, you can start your server with `npm start` or `nodemon`.
