const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost", // using localhost for testing until server is decided
    databse: "PIK",
});

db.connect(err => {
    if (err) {
        console.log("MySQL Connection Error:", err);
    } else {
        console.log("MySQL Connected!");
    }
})

app.get("db/users", (req, res) => { // placeholder until tables have been finalized
    db.query("SELECT * FROM users", (err, result) => {
        if (err) return res.json({ error: err});
        res.json(result);
    });
});

app.post("db/users", (req, res) => {
    const {name} = req.body;
    db.query("INSERT INTO users (name) VALUES (?)", [name], (err, result)=> {
        if (err) return res.json({ err: err });
        res.json({ message: "User added successfully" });
    });
});

app.listen(5000, () => { // port 5000 for testing purposes only
    console.log("Server running on port 5000");
});

