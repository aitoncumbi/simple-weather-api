import express from "express";
import {} from "dotenv/config";
import cors from "cors";


// const cors = require('cors');
const app = express();
const PORT  = process.env.PORT;
const API_KEY  = process.env.API_KEY;


app.get('/test', cors(), (req, res)=>{
    
    let city = req.query.city;

      async function citty_grabber(){
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`);
        let data = await response.json();
        data = JSON.stringify(data);
        data = JSON.parse(data);
        return data;
      } 
    

      async function weather_fetcher(){
        let headers = await citty_grabber();
        let lat =  headers[0].lat;
        let lon =  headers[0].lon;

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        let data = await response.json();
        data = JSON.stringify(data);
        data = JSON.parse(data);

        res.send(data)
      }
        
        
        
    //   async function main(){
       
    //     let headers = await citty_grabber();
    //     let latitude = await headers[0].lat;
    //     let longitude = await headers[0].lon;
    //     console.log("Latitude: ", latitude);
    //     console.log("Longitude: ", longitude);


    //   }

    //   main();
      weather_fetcher();
        
})





app.listen(PORT || 3000, ()=>{
    console.log(`currently running on port ${PORT || 3000} your key is ${API_KEY}`)
    
})

app.use(cors({origin:'*'}))
