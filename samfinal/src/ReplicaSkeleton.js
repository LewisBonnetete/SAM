import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() => ({
  card: {
    width: "98%",
    height: "100%",
    margin: "0.5vw",
  },
}));

export default function ReplicaSkeleton() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <Skeleton
          style={{ marginTop: 16, marginLeft: 16, marginBottom: 20 }}
          height={35}
          width={100}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"97%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"95%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 16 }}
          height={25}
          width={"75%"}
          animation="wave"
        />
      </Card>
      <Card className={classes.card}>
        <Skeleton
          style={{ marginTop: 16, marginLeft: 16, marginBottom: 20 }}
          height={35}
          width={100}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 16 }}
          height={25}
          width={"57%"}
          animation="wave"
        />
      </Card>
      <Card className={classes.card}>
        <Skeleton
          style={{ marginTop: 16, marginLeft: 16, marginBottom: 20 }}
          height={35}
          width={100}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"97%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"97%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"96%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"95%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"97%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 16 }}
          height={25}
          width={"75%"}
          animation="wave"
        />
      </Card>
      <Card className={classes.card}>
        <Skeleton
          style={{ marginTop: 16, marginLeft: 16, marginBottom: 20 }}
          height={35}
          width={100}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 16 }}
          height={25}
          width={"57%"}
          animation="wave"
        />
      </Card>
      <Card className={classes.card}>
        <Skeleton
          style={{ marginTop: 16, marginLeft: 16, marginBottom: 20 }}
          height={35}
          width={100}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"97%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
          height={25}
          width={"95%"}
          animation="wave"
        />
        <Skeleton
          style={{ marginTop: 0, marginLeft: 16, marginBottom: 16 }}
          height={25}
          width={"75%"}
          animation="wave"
        />
      </Card>
    </>
  );
}
