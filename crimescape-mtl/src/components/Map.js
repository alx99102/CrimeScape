import { useEffect, useState } from "react";


function Map({ body }) {
  // Pretend parameters are set from frontend
  const [mapData, setMapData] = useState({ mapData: [] });
  const [error, setError] = useState(0);
  const [componentKey, setComponentKey] = useState(0)

  useEffect(() => {
    async function apiCall() {
      try {
        if (isValidBody()) {
          console.log('fetch backend')

          // Request Data from backend
          const response = await fetch('http://127.0.0.1:5000/generate', {
            mode: 'no-cors',
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Header': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify({body})
          });

          // if (!response.ok) {
          //   throw (`HTTP error, status: ${response.status}`);
          // }

          // let mapData = await response.json();

          setMapData(mapData);

          // Handle Response
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
      return Math.floor(new Date(date).getTime());
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
      }
    </div>
  );
}

export default Map;