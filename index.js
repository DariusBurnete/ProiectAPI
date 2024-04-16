import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/list', (req, res) =>{
    res.render("list.ejs", {activePage: 'list'});
});

app.get('/sort', (req, res) =>{
    res.render("sort.ejs", {activePage: "sort"});
});

app.get('/search', (req, res) =>{
    res.render("search.ejs", {activePage: "search"});
});

app.get('/about', (req, res) =>{
    res.render("about.ejs", {activePage: "about"});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});