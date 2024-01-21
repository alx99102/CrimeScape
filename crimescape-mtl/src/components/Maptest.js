import React from 'react';
import { GoogleMap, useLoadScript, Marker, HeatmapLayerF } from '@react-google-maps/api';

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

const Maptest = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const heatMapData = [
    { location: new window.google.maps.LatLng(45.5126, -73.6802), weight: 1 },
    { location: new window.google.maps.LatLng(45.5124, -73.6802), weight: 1 },
    { location: new window.google.maps.LatLng(45.5122, -73.6802), weight: 1 },
    ];

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}>
    <HeatmapLayerF data={heatMapData} options={heatMapOptions} />    
      </GoogleMap>
    </div>
  );
};

export default Maptest;