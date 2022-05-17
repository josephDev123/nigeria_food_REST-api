import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config()

//port
const port = process.env.PORT;
const app = express();

// routes
app.get('/', (req, res)=>{
    axios.get('https://insanelygoodrecipes.com/nigerian-foods/').then(foods=>{
        
    }).catch(e=>console.log(e.message))
    res.end();

});


app.listen(port, ()=> console.log(`running on port ${port}`))