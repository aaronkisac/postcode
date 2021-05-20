import React, { useMemo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapContainer({ postcodeDetails }) {
  const mapStyles = {
    height: "20vh",
    width: "100%",
  };

  const defaultCenter = useMemo(
    () => ({
      lat: postcodeDetails.latitude || 0,
      lng: postcodeDetails.longitude || 0,
    }),
    [postcodeDetails]
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyC0flOgpCUr9ImSbJ5AWPSiQ6LLVx9PvPo">
      <GoogleMap mapContainerStyle={mapStyles} zoom={16} center={defaultCenter}>
        {<Marker position={defaultCenter} />}
      </GoogleMap>
    </LoadScript>
  );
}
