const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        res.json(JSON.parse(data));
      });
});

app.post('/api/notes', (req, res) => {
    req.body.id = db.length.toString(); 
    const newNotes = req.body;  
    db.push(newNotes);
    
    const notes = JSON.stringify(db);
    fs.writeFileSync('./db/db.json', notes);
    res.json(notes);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html')) 
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  })
