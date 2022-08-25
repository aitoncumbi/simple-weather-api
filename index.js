require("dotenv/config");
const fetch = require('node-fetch');

const express = require("express");

const app = express();
const PORT  = process.env.PORT;
const API_KEY  = process.env.API_KEY;
const cors = require("cors");


app.get('/test', cors(), (req, res)=>{
  async function citty_grabber(){


    try {

      let city = req.query.city;
      let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`);
      let data = await response.json();
      data = JSON.stringify(data);
      data = JSON.parse(data);
      return data;
    
      
    } catch (error) {
      console.log(error)
    }
      } 

    

    

      async function weather_fetcher(){

        try {

          let headers = await citty_grabber();
          let lat =  headers[0].lat;
          let lon =  headers[0].lon;
  
          let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
          let data = await response.json();
          data = JSON.stringify(data);
          data = JSON.parse(data);
  
          res.send(data)
          
        } catch (error) {
          console.log(error)
          res.send("city cannot be empty")
        }


      }
        
      weather_fetcher();
        
})





app.listen(PORT || 3000, ()=>{
    console.log(`currently running on port ${PORT || 3000} your key is ${API_KEY}`)
    
})

app.use(cors({origin:'*'}))
