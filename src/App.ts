import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { FlightPriceData } from './interface';

// Load environment variables
dotenv.config();

// Set up Express server
const app = express(); 

const api_data : {
  [key: string ]: Object;  
} = {
  "delhi_jaipur": { 
      "indigo": "₹1,614",
      "airAsia": "₹1,869",
      "vistara": "₹2133" 
  }, 
  "delhi_bangalore": { 
    "indigo": "₹5,614",
      "airAsia": "₹5,869",
      "vistara": "₹5,133" 
  }
}

// Define API endpoint for flight prices
app.get('/flight-price', async (req: Request, res: Response) => {
 
  const { origin, destination }  = req.query;
  // console.log(origin, destination);

  // I was not having API to fetch the real time result from flight API, so i created a temporary object for data.
  // Make request to flight service API
  // const options = {
  //   method: 'GET',
  //   //url: 'https://flight-info-api.p.rapidapi.com/status',
  //   params: {
  //     origin: origin,
  //     destination: destination,
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
  //     'X-RapidAPI-Host': 'flight-info-api.p.rapidapi.com',
  //   },
  // }; 
  try {

    // const response = await axios.get('https://flight-info-api.p.rapidapi.com/status', options);
    

    // Extract flight price data from response
    let desiredOutput;
    Object.keys(api_data).forEach((key: string) => {
      let k1 = (origin as string).toLowerCase().replace(" ", "");
      let k2 = (destination as string).toLowerCase().replace(" ", "");
      let toSearchKey = k1 + "_" + k2; // Delhi "WestBangal"  
      let returnSearchKey = k2 + "_" + k1;
      if(toSearchKey === key || returnSearchKey == key) {
        desiredOutput = api_data[key];
      }
    });

    // Return flight price data as JSON
    res.json(desiredOutput);
  } catch (error) {
    //console.error(error);
    res.status(500).send(error);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});