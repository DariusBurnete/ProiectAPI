import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import env from 'dotenv';

env.config();

const app = express();
const port = 3000;
const apiKey = process.env.API_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/list', async(req, res) =>{
    let movies = [];
    try{
        let page = 1;
        let response;
        do {
            response = await axios.get(
                `http://www.omdbapi.com/?s=man&page=${page}&apikey=${apiKey}`
            );
            movies = movies.concat(response.data.Search || []);
            page++;
        } while (response.data.Search && response.data.Search.length !== 0 && page <= 80);
        res.render("list.ejs", {activePage: "list", movies});
    } catch (error){
        console.error(error);
    }
});

app.get('/sort', (req, res) =>{
    res.render("sort.ejs", { activePage: "sort" });
});

app.post('/sort', async(req, res) =>{
    let movies = [];
    const year = req.body.year;
    try{
        let page = 1;
        let response;
        do{
            response = await axios.get(
                `http://www.omdbapi.com/?s=man&y=${year}&page=${page}&apikey=${apiKey}`
            );
            movies = movies.concat(response.data.Search || []);
            page++;
        } while(response.data.Search && response.data.Search.length !== 0 && page <= 7);
        res.render("sort.ejs", { activePage: "sort", movies });
    } catch (error){
        console.error(error);
    }
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


