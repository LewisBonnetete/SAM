import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    maxWidth: "400px",
    margin: 1,
  },
}));

// ChipContainers were designed to allow adding(our API doesn't support it yet) and cropping. Also they're meant to hold NLP extracted informations we or anyone develop in the future (data structure is not defined yet)
export default function ChipContainer({ title, tab, color }) {
  const classes = useStyles();

  // Limit for cropping
  const [limit, setLimit] = React.useState(10);

  return (
    <>
      <Typography style={{ margin: 10, fontSize: 20 }}>
        {title + ": "}
      </Typography>

      {tab
        ? tab.map((elem, key) =>
            key < limit ? (
              <Chip
                color={color}
                variant="outlined"
                size="medium"
                className={classes.chip}
                key={key}
                label={elem?.user?.name ? elem.user.name : elem}
              />
            ) : key === limit ? (
              <Chip
                color={color}
                clickable
                onClick={() => {
                  setLimit(limit + 5);
                }}
                key={key}
                variant="outlined"
                size="medium"
                className={classes.chip}
                label="..."
              />
            ) : null
          )
        : null}
      <Chip
        color={color}
        clickable
        variant="outlined"
        size="medium"
        className={classes.chip}
        label="+"
      ></Chip>
      <br />
      <br />
    </>
  );
}
