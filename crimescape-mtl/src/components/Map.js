import { useEffect, useState } from "react";
import axios from 'axios';
import MapVisual from "./MapVisual";

function Map({ body }) {
  // Pretend parameters are set from frontend
  const [mapData, setMapData] = useState({ mapData: [] });
  const [error, setError] = useState(0);
  const [componentKey, setComponentKey] = useState(0)
  const [responseData, setResponseData] = useState({ responseData: [[]] });

  useEffect(() => {
    async function apiCall() {
      try {
        if (isValidBody()) {
          console.log('fetch backend')

          const response = await axios.post('http://127.0.0.1:5000/generate', body)
          

          // Handle Response
          setResponseData(response.data);

        }
        else {
          throw ("Please enter start and end dates, make sure start date is before end date.");
        }
      }
      catch (error) {
        console.log(error)
        setError(error);
      }
    }
    apiCall();
  }, [body]);

  function isValidBody() {
    body.start_date = dateToUnix(body.start_date);
    body.end_date = dateToUnix(body.end_date);

    return checkOption(body.type) && checkOption(body.time_of_day) && body.start_date && body.end_date && checkBool(body.is_prediction) && (body.start_date < body.end_date);
  }

  function checkBool(bool) {
    return (bool == true || bool == false) && (bool != undefined || bool != null);
  }

  function dateToUnix(date) {
    if (date != "" || date != null || date != undefined || new Date(date) != "Invalid Date") {
      return Math.floor(new Date(date).getTime()/1000);
    }
    return false;
  }

  function checkOption(option) {
    return option != '' && option != null && option != undefined;
  }

  useEffect(() => {
    console.log(body);
  }, [body]);
  return (
    <div>
      {error ?
        <p>{error}</p>
        :
        <p></p>
      }
      {
        // Display Map here
        <MapVisual coordinatesArray={responseData}/>
      }
    </div>
  );
}

export default Map;