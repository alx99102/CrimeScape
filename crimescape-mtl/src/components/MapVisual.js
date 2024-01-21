import React from 'react';
import { GoogleMap, useLoadScript, HeatmapLayerF } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const libraries = ['visualization'];

const mapContainerStyle = {
  width: '100%',
  height: '80vh',
};
const center = {
  lat: 45.5126,
  lng: -73.6802,
};

const heatMapOptions = {
  radius: 20,
  opacity: 0.5,
};

const MapVisual = ({ coordinatesArray }) => {
  const [heatMapData, setHeatMapData] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (Array.isArray(coordinatesArray) && coordinatesArray.length > 0) {
      const tempHeatMap = coordinatesArray.map(coord => {
        return new window.google.maps.LatLng(coord[1], coord[0]);
      });
      setHeatMapData(tempHeatMap);
    }
  }, [coordinatesArray]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center}>
      {isLoaded && heatMapData.length > 0 && (
        <HeatmapLayerF
          data={heatMapData}
          options={heatMapOptions}
        />
      )}
    </GoogleMap>
  );
};

export default MapVisual;