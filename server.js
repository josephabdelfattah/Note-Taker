const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");
var http = require("http");

const PORT = process.env.PORT || 8080;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (request, response) => {

    response.sendFile(path.join(__dirname, "public", "notes.html"));
    console.log("Your Notes!");
})


app.get("/", (request, response) => {
   
    response.sendFile(path.join(__dirname, "public", "index.html"));
    console.log("Your index!");
})

app.get("/api/notes", (request, response) => {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        response.json(JSON.parse(jsonString));
        // json.parse
    })
})


app.post("/api/notes", function (request, response) {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);
        // json.parse
        var notes = JSON.parse(jsonString);

        // Note object 
        const newNote = {
            title: request.body.title,
            text: request.body.text,
            // Github code 
            id: Math.random().toString(36).substr(2, 9)
        };

        
        notes.push(newNote);
        
        let NotesJSON = JSON.stringify(notes);
        

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            // this is console logging
            console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    })

});


app.delete('/api/notes/:id', function (request, response) {

   

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);
        // json.parse
        var notes = JSON.parse(jsonString);

        // Note object 
        const newNote = {
            title: request.body.title,
            text: request.body.text,
            // Github code 
            id: Math.random().toString(36).substr(2, 9)
        };

        
        notes.splice(request.params.id, 1);
      
        let NotesJSON = JSON.stringify(notes);
        

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            
            console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    })

});
// Server listening confirmation
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});