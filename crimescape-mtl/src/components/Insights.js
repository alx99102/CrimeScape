import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Insights = () => {
  const [responseData, setResponseData] = useState({ crimeByTimeOfDay:"",  topCrimeInYear:"", crimeBySeason:""});
  // Get Insights from backend
  useEffect(() => { getInsights(); }, []);

  const getInsights = async () => {
    let response = await axios.get('http://127.0.0.1:5000/insights', {responseType: "json"})
    setResponseData(responseData => ({...responseData, ...response.data}) )
    console.log(response.data)
  }


  return (
    <div className="insights-container">
      <h2>Insights</h2>
      <div className='bg-teal-700'>

        <p>{responseData.crimeByTimeOfDay}</p>

        <p>{responseData.topCrimeInYear}</p>

        <p>{responseData.crimeBySeason}</p>
      </div>
    </div>
  )
};

export default Insights;