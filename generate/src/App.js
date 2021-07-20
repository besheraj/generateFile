import "./App.css";
import { useState } from "react";
import { Button } from "@material-ui/core";

function App() {
  const [info, setInfo] = useState();
  const [generate, setGenerate] = useState(false);
  const [report, setReport] = useState(false);

  const generateCSVFile = async () => {
    const res = await fetch("http://127.0.0.1:8000/get", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setGenerate(true);
    setInfo(data);
    return data;
  };

  const filePath =  info?.filePath

  return (
    <div className="App">
      <div className="center">
        <Button
          onClick={() => generateCSVFile()}
          variant="contained"
          color="primary"
        >
          {" "}
          generate file{" "}
        </Button>
      </div>
      <div className="center">
        {generate && info ? (
          <a href={filePath} download>
            Download
          </a>
        ) : null}
      </div>

      <div className="center">
        {generate ? (
          <Button
            onClick={() => setReport(true)}
            variant="contained"
            color="primary"
          >
            {" "}
            file report{" "}
          </Button>
        ) : null}
      </div>
      {report ? (
        <div className="center">
          <h3> lphabetical strings : {info.countRandomString}</h3>
          <h3> real numbers : {info.countRandomDecimal}</h3>
          <h3> integers : {info.countInteger}</h3>
          <h3> alphanumerics : {info.countRandomalphanumerics}</h3>
        </div>
      ) : null}
    </div>
  );
}

export default App;
