import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config()

//port
const port = process.env.PORT;
const app = express();

const naija_food =['https://insanelygoodrecipes.com/nigerian-foods/'];
   

// routes
app.get('/api/v1/naija/food', (req, res)=>{
    
    // extracting the data
    axios.get('https://insanelygoodrecipes.com/nigerian-foods/').then(foods=>{
        let data = []
        const html = foods.data
        const $ = cheerio.load(html);

        $('.ek-link', html).each(function () { //<-- cannot be a function expression
        data.push($(this).text())
            // console.log($(this).text())  
            
        });
        res.json(data)
    }).catch(e=>console.log(e.message));
  
})

app.listen(port, ()=> console.log(`running on port ${port}`))
