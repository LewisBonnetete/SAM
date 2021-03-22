import React from "react";
import { Dropdown } from "semantic-ui-react";

export default function Downloader({ url, id }) {
  return (
    <>
      <Dropdown
        style={{ marginTop: "10px", marginLeft: "25px", paddingBottom: 0 }}
        text="Download"
      >
        <Dropdown.Menu>
          <Dropdown.Item
            href={url + "meetings/" + id + "/transcript/download?ext=pdf"}
            text="Pdf"
          />
          <Dropdown.Item
            href={url + "meetings/" + id + "/transcript/download?ext=docx"}
            text="Docx"
          />
          <Dropdown.Item
            href={url + "meetings/" + id + "/transcript/download?ext=txt"}
            text="Txt"
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
