const express = require("express");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("countries"));

app.listen(3000);

app.get("/", (req, res) => {
    // res.sendFile("./views/index.html", { root: __dirname });
    // res.sendFile("Hello vai");
    res.render("index");
});

app.get("/uni/:country_name", (req, res) => {
    const country = req.params.country_name.split("+").join(" ");
    fs.readFile(`./countries/${country}.json`, (err, data) => {
        if (err) {
            res.status(404).send("<h1>Country not found</h1>");
        } else {
            const uni_list = JSON.parse(data.toString());
            res.json({
                uni_list,
            });
        }
    });
});

app.use((req, res) => {
    res.status(404).send("<h1>Webpage unknown</h1>");
});
