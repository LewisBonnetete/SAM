import React from "react";
import Button from "@material-ui/core/Button";
import { Modal } from "semantic-ui-react";
import ReactMicRecord from "react-mic-record";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function Enroll({}) {
  const [open, setOpen] = React.useState(false);
  const [record, setRecord] = React.useState(false);
  const [state, setState] = React.useState("EMPTY");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState("DONE");
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div style={{ marginTop: 9 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={state === "ACQUIRED" ? true : false}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Voice-print acquired
        </Alert>
      </Snackbar>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button color="secondary">Enroll</Button>}
      >
        <Modal.Content>
          <ReactMicRecord
            record={record}
            className={"soundwave"}
            onData={(recordedBlob) => {
              console.log("Data:");
              console.log(record);
              console.log(recordedBlob);
            }}
            onStop={(recordedBlob) => {
              setOpen(false);
              setState("ACQUIRED");
              console.log("Stop:");
              console.log(record);
              console.log(recordedBlob);
            }}
            strokeColor={"#ffffff"}
            backgroundColor={"#45a3fa"}
          />
        </Modal.Content>
        <Modal.Actions>
          {record ? (
            <Button onClick={() => setRecord(false)}>Stop Recording</Button>
          ) : (
            <Button onClick={() => setRecord(true)}>Record</Button>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
