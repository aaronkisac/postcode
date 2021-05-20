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
    <Card onClick={onClick} className={classes.card}>
      <CardHeader title={`Postcode: ${postcodeDetails.postcode}`} />
      {!noMap && <MapContainer postcodeDetails={postcodeDetails} />}
      <CardContent>
        <div>
          <Typography variant="h6">Region: {postcodeDetails.region}</Typography>
          <Typography variant="h5">
            Country: {postcodeDetails.country}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
