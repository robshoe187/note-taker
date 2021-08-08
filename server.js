//require statements
const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

//setup express server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//get route for the notes api
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        res.json(JSON.parse(data));
      });
});

//post route for the notes api
app.post('/api/notes', (req, res) => {
    //provides an id for db.json 
    req.body.id = db.length.toString(); 
    //takes the request and adds it to the newNotes variable
    const newNotes = req.body;  
    //add the new note to db.json
    db.push(newNotes);
    //make the db a string so it can be written to the file
    const notes = JSON.stringify(db);
    fs.writeFileSync('./db/db.json', notes);
    //return the note data
    res.json(notes);
});

//route to display the notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//route to display the home page
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

//route to display wildcard homepage as default
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html')) 
});

//tells express which port to listen to
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  })
