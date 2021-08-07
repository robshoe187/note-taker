const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
//const nanoid = require('nanoid');
const fs = require('fs');
//const { db } = require('db/db.json');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/api/notes', (req, res) => {
    //res.sendFile(path.join(__dirname, './db/db.json'));
    fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        res.json(data);
      });
});

// app.post('/api/notes', (req, res) => {
//    const data = req.body;
//    //const data = JSON.stringify(newNotes);   
   
//     fs.writeFile('./db/db.json', data, (err) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(data);
//         res.json(data);
//     });  
// });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
