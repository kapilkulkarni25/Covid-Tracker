import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = (props, ...click) => {
  // console.log(props);
  // if (!confirmed) {
  //   return "Loading...";
  // }
  // console.log(props.data);
  if (!props.data.cases) {
    return "Loading...";
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          onClick={() => console.log("cases")}
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={props.data.cases}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {/* {new Date(lastUpdate).toDateString()} */}
            </Typography>
            <br />
            <Typography variant="body2">No of Active Cases</Typography>
          </CardContent>
        </Grid>
        <Grid
          onClick={() => console.log("cases")}
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={props.data.deaths}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {" "}
              {/* {new Date(lastUpdate).toDateString()} */}
            </Typography>
            <br />
            <Typography variant="body2">No of Deaths Cases</Typography>
          </CardContent>
        </Grid>
        <Grid
          onClick={() => console.log("cases")}
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              {" "}
              <CountUp
                start={0}
                end={props.data.recovered}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {" "}
              {/* {new Date(lastUpdate).toDateString()} */}
            </Typography>
            <br />
            <Typography variant="body2">No of Recovered Cases</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};
export default Cards;
