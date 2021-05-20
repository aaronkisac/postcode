import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchData } from "../service/fetchData";
import CardForPostcodeDetails from "./CardForPostcodeDetails";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));
export default function Details() {
  const [result, setResult] = useState({});
  const [nearestPostcodes, setNearestPostcodes] = useState([]);
  const { postcode } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const getPostCodeDetails = async (postcode) => {
    try {
      const res = await fetchData(postcode);
      setResult(res.data.result);
    } catch (error) {
      toast.error(`Poscode details: ${error.message}`);
    }
  };
  const getNearestPostcodes = async (postcode) => {
    try {
      const res = await fetchData(`${postcode}/nearest`);
      setNearestPostcodes(res.data.result);
    } catch (error) {
      toast.error(`Poscode details: ${error.message}`);
    }
  };

  useEffect(() => {
    getNearestPostcodes(postcode);
    getPostCodeDetails(postcode);
  }, [postcode]);

  if (!postcode) {
    return null;
  }

  return (
    <div className="App">
      <h1>Selected Postcode Details</h1>
      <CardForPostcodeDetails poscodeDetails={result} />
      <h1>Nearest Postcodes List of Selected Postcode </h1>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            {nearestPostcodes
              ?.filter((item) => postcode !== item.postcode)
              ?.map((value) => (
                <Grid xs={4} key={value.postcode} item>
                  <CardForPostcodeDetails
                    onClick={() => {
                      history.push(`${value.postcode}`);
                    }}
                    poscodeDetails={value}
                    noMap={true}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
