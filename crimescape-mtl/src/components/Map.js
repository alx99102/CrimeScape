import { useEffect, useState } from "react";
import axios from 'axios';
import MapVisual from "./MapVisual";

function Map({ body }) {
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    async function apiCall() {
      try {
        if (isValidBody(body)) {
          const response = await axios.post('http://127.0.0.1:5000/generate', body)
          if (response && response.data) {
            const formattedData = response.data.map(item => [item[0], item[1]]);
            setResponseData(formattedData);
          }
        } else {
          throw new Error("Invalid input body.");
        }
      } catch (error) {
        setError(error.toString());
      }
    }
    apiCall();
  }, [body]);

  return (
    <div>
      {error ? <p>{error}</p> : <MapVisual coordinatesArray={responseData} />}
    </div>
  );
}

function isValidBody(body) {
  body.start_date = dateToUnix(body.start_date);
  body.end_date = dateToUnix(body.end_date);
  return checkOption(body.type) && checkOption(body.time_of_day) && body.start_date && body.end_date && checkBool(body.is_prediction) && (body.start_date < body.end_date);
}

function checkBool(bool) {
  return bool === true || bool === false;
}

function dateToUnix(date) {
  return new Date(date).getTime() / 1000;
}

function checkOption(option) {
  return option !== '';
}

export default Map;