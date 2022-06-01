import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config()

//port
const port = process.env.PORT;
const app = express();

const naija_food =['https://www.thepretendchef.com/nigerian-dishes-to-cook/'];

// routes
app.get('/api/v1/naija/food', (req, res)=>{
    
    // extracting the data
    axios.get(`${naija_food}`).then(foods=>{
        let data = []
        const html = foods.data
        const $ = cheerio.load(html);

        $('h3 strong [href]', html).each(function () { //<-- cannot be a function expression
            const result ={
                title:$(this).text(),
                link: $(this).attr('href'),
                content:$(this).children('p').text()
            }
        data.push(result)
            // console.log($(this))  
            
        });

        res.json(data)
    }).catch(e=>console.log(e.message));
  
})

app.listen(port, ()=> console.log(`running on port ${port}`))




// $('.pinterest-block a[data-pin-href]').each(function(){
//     var newurl = $(this).attr('data-pin-href').replace('repin/x/','');
//     $(this).attr('data-pin-href', newurl);
// });