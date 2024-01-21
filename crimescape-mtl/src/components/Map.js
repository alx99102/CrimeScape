import { useEffect, useState } from "react";
import axios from 'axios';

function Map({ body }) {
  // Pretend parameters are set from frontend
  const [mapData, setMapData] = useState({ mapData: [] });
  const [error, setError] = useState(0);
  const [componentKey, setComponentKey] = useState(0)
  const [responseData, setResponseData] = useState({ responseData: [[]] });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });



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

  const libraries = ['visualization'];
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };
  const center = {
    lat: 45.5126, //center latitude
    lng: -73.6802, //center longitude
  };
  
  const heatMapOptions = {
      radius: 20,
      opacity: 0.5,
      };
  const heatMapData = coordinatesArray.map((coordinate) => new window.google.maps.LatLng(coordinate[0], coordinate[1]));

  return (
    <div>
      {error ?
        <p>{error}</p>
        :
        <p></p>
      }
      {
      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={center}>
      <HeatmapLayerF data={heatMapData} options={heatMapOptions} />    
    </GoogleMap>
      }
    </div>
  );
}

export default Map;