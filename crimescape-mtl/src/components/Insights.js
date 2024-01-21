import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Insights = () => {
  const [responseData, setResponseData] = useState({ crimeByTimeOfDay:"",  topCrimeInYear:"", crimeBySeason:""});
  const [isLoading, setIsLoading] = useState(true);
  // Get Insights from backend
  useEffect(() => { getInsights(); }, []);

  const getInsights = async () => {
    let response = await axios.get('http://127.0.0.1:5000/insights', {responseType: "json"})
    setResponseData(responseData => ({...responseData, ...response.data}) )
    setIsLoading(false);
    console.log(response.data)
  }

  const LoadingSVG = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="insights-container">
      <h2 className='text-white text-2xl'>Insights</h2>
      {isLoading ? <div className="flex justify-center items-center h-32">
        <LoadingSVG />
      </div> :
      <div>
      <div className='bg-blue-800 text-white px-2 my-4 flex flex-row justify-items-center items-center'>
        <svg className="mr-4" fill="#ffffff" width="140px" height="140px" viewBox="-2 -2 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"></path></g></svg>
        <p className='text-xs'>{responseData.crimeByTimeOfDay}</p>
      </div>
      <div className='bg-blue-800 text-white px-2 my-4 flex flex-row justify-items-center items-center'>
      <svg className="mr-4" fill="#ffffff" width="140px" height="140px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="menu-arrow-circle"> <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect> <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path> <path d="M12 6a3.5 3.5 0 0 0-3.5 3.5 1 1 0 0 0 2 0A1.5 1.5 0 1 1 12 11a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.16A3.49 3.49 0 0 0 12 6z"></path> <circle cx="12" cy="17" r="1"></circle> </g> </g> </g></svg>
        <p className='text-xs'>{responseData.topCrimeInYear}</p>
      </div>
      <div className='bg-blue-800 text-white px-2 my-4 flex flex-row justify-items-center items-center'>
      <svg className="mr-4" width="140px" height="140px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8H12.01M12 11V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        <p className='text-xs'>{responseData.crimeBySeason}</p>
      </div>
  </div>
  }
    </div>
  )
};

export default Insights;