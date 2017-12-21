This is the front-end for my project https://github.com/YIZHUANG/ideaManagement_backend_knex_nodejs

Build with ReactJs as front-end.
Node.js, Knex as back-end, and postgresql as the database.

```
$ Make sure you have my back-end files.
```
## Install project dependencies
```
$ npm install
```
## Run the app:
```
$ npm start
```

## front-end files explained.  it is running on port 3000.
```
App.js : where all the routes are defined.
home.js : where the list of ideas and everything is displayed.
memberList.js : where the list of members/users are displayed.
commentForm.js: self-explanatory, where you add comment to a certain idea.
add.js: where you add a list of ideas, be sure to left no field empty.
edit.js: same as above.
```
```
Functions:
display a list of data.
add data. (when you add data, it will trigger another add data request automatically)
edit the data. (when you edit data, it will trigger another edit data request automatically)
delete the data.(Associated rows from other tables will be deleted as well due to back-end set-up onDelete('CASCADE'))
```
