import React, { useMemo } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function MapContainer({ poscodeDetails }) {
  const mapStyles = {
    height: "40vh",
    width: "100%"
  };

  const defaultCenter = useMemo(
    () => ({
      lat: poscodeDetails.latitude || 0,
      lng: poscodeDetails.longitude || 0
    }),
    [poscodeDetails]
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyC0flOgpCUr9ImSbJ5AWPSiQ6LLVx9PvPo">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={defaultCenter}
      />
    </LoadScript>
  );
}
