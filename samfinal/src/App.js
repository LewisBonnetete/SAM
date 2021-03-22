import React, { Suspense } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "semantic-ui-css/semantic.min.css";
import MeetingGridSkeleton from "./MeetingGridSkeleton";

// const Dashboard = React.lazy(() => import("./Dashboard"));
// const Meeting = React.lazy(() => import("./Meeting"));
import Dashboard from "./Dashboard";
import Meeting from "./Meeting";
import Enroll from "./Enroll";
import { DemoContext } from "./DemoContext";

const StaticDashboard = () => {
  return (
    <div>
      <header>
        <div className="bandeau">
          <div
            style={{
              marginLeft: "46vw",
              lineHeight: "50px",
              fontSize: "35px",
              textDecoration: "none",
              color: "white",
            }}
          >
            SAM
          </div>
        </div>
      </header>
      <MeetingGridSkeleton type={false} />
    </div>
  );
};

// Some stuff are hardcoded since I developed for 1600x900 screens and the app wouldl obviously need an new design for phones yet it should get its way through any modern computer (I only used chrome)
// Some things (like some formats, data structures or components) are not so relevant nor coherent, we iterated a lot and tried to keep as much flexibility as possible while wasting the minimum amount of time on casualities or long term constraints
// I used a lot of google's MUI components for react https://material-ui.com/
// Sorry for the hybrid styling, I learnt on the field

const App = () => {
  // Changer l'url en fonction de ou est lancee l'API
  const url = "http://LP456338:5000/api/";

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#45a3fa",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "100%" }}>
        <Suspense fallback={<StaticDashboard />}>
          <Router>
            <DemoContext.Provider value="false" default>
              <Enroll path="/enroll" />
              <Dashboard url={url} path="/" />
              <Meeting url={url} path="/meeting/:id" />
            </DemoContext.Provider>
          </Router>
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById("root"));
