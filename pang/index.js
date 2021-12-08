
const express = require("express");
const app = express();

app.get("/", (req, res) => {  
    res.sendFile(__dirname + "/publikmapp/index.html");  // serva statisk html-sida, notera att filnamnet "exempel.html" inte syns i URL:en; __dirname hänvisar till sökvägen som serverskriptet index.js finns i
});
app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");

app.use(express.static("publikmapp")); // Här ligger all info till pang i grillens sub-sidor
let fs = require("fs");
const { stringify } = require("querystring");
app.use(express.urlencoded()); // kanske ska bort då vi har bodyparser?
app.post("/skriva-fil", (req, res) => {
    let meddelande = req.body.meddelande;
    meddelande += "\n";
    fs.appendFile("meddelanden.txt", meddelande, (err) =>{
        if(err) throw err;

    });
    res.send(`Skrev till fil: ${meddelande}`);
})

 // skaffar fram varje subsida, från publikmapp
app.get("/admin", (req, res) => {  
    res.sendFile(__dirname + "/admin.html"); 
});
app.get("/bokning", (req, res) => {  
    res.sendFile(__dirname + "/bokning.html"); 
});
app.get("/FAQ", (req, res) => {  
    res.sendFile(__dirname + "/FAQ.html"); 
});
app.get("/kontakt", (req, res) => {  
    res.sendFile(__dirname + "/kontakt.html"); 
});
app.get("/meny", (req, res) => {  
    res.sendFile(__dirname + "/meny.html");  
});
////////////////////////////////////////////////////////////////////////
// bokning.html validerar input, skickar sedan ifall validering OK, hit allting
// och detta skript validerar även den en gång, slutligen uppdateras hemsidan
// genom att detta skript skickar tillbaka något, och uppdaterar textfilen (json-format)