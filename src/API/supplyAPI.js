import axios from 'axios';
export default axios.create({
    baseURL: 'https://test.iamdave.ai' ,
    headers:{ 
        "Content-Type" :"application/json",
        "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
        "X-I2CE-USER-ID":"ananth+covid@i2ce.in",
        "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434"
    }
     

});