"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Set up Express server
const app = (0, express_1.default)();
const api_data = {
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
};
// Define API endpoint for flight prices
app.get('/flight-price', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination } = req.query;
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
        Object.keys(api_data).forEach((key) => {
            let k1 = origin.toLowerCase().replace(" ", "");
            let k2 = destination.toLowerCase().replace(" ", "");
            let toSearchKey = k1 + "_" + k2; // Delhi "WestBangal"  
            let returnSearchKey = k2 + "_" + k1;
            if (toSearchKey === key || returnSearchKey == key) {
                desiredOutput = api_data[key];
            }
        });
        // Return flight price data as JSON
        res.json(desiredOutput);
    }
    catch (error) {
        //console.error(error);
        res.status(500).send(error);
    }
}));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
//# sourceMappingURL=App.js.map