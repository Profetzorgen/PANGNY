
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



// den här som behöver fås igång
// app.post("/skriva-fil", (req, res) => {
//     let date = req.body.date;// lägg till en radbrytning mellan varje meddelande
//     fs.appendFile("meddelanden.txt", date, (err) => { // OBS - skapar filen om den inte redan finns, lägger annars till befintlig text
//         if(err) throw err;
//     });
//     res.send(`Skrev till fil: ${date}`);
// });
// action "/skriva-fil" är app.post
// method="post" är .post
// <textarea name ="meddelande" är meddelande.