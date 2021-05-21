import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader, Card, CardContent, Typography } from "@material-ui/core";
import MapContainer from "./MapContainer";

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "left",
    maxWidth: 345,
    margin: "40px auto",
    boxShadow: "6px 6px 4px 6px rgb(0 0 0 / 12%)",
  },
}));

export default function CardForPostcodeDetails({
  onClick,
  postcodeDetails,
  noMap,
}) {
  const classes = useStyles();
  return (
    <Card data-testid="cardWrapper" onClick={onClick} className={classes.card}>
      <CardHeader
        data-testid="cardHeader"
        title={`Postcode: ${postcodeDetails.postcode}`}
      />
      <div data-testid="mapContainer">
        {!noMap && <MapContainer postcodeDetails={postcodeDetails} />}
      </div>
      <CardContent>
        <div>
          <Typography variant="h6" data-testid="region">
            Region: {postcodeDetails.region}
          </Typography>
          <Typography variant="h5" data-testid="country">
            Country: {postcodeDetails.country}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
