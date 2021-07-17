import "./App.css";
import { getRandomDecimal, getRandomalphanumerics, getRandomString, getRandomInteger } from "./lib/generateTypes";
import { CSVLink } from "react-csv";

function App() {
  const byteSize = (str) => new Blob(str).size;
  let file = [];
  let size = 0;
  let countRandomDecimal = 0;
  let countRandomalphanumerics = 0;
  let countInteger = 0;
  let countRandomString = 0;

  const generateCSVFile = () => {

    while (true) {
      let randomChoice = Math.floor(Math.random() * 4) + 1;
      let randomGenerator = Math.floor(Math.random() * 10) + 5;
      if (randomChoice === 1) {
        file.push(getRandomDecimal(randomGenerator));
        countRandomDecimal++;
      }
      if (randomChoice === 2) {
        file.push(getRandomalphanumerics(randomGenerator));
        countRandomalphanumerics++;
      }
      if (randomChoice === 3) {
        file.push(getRandomString(randomGenerator));
        countRandomString++;
      }
      if (randomChoice === 4) {
        file.push(getRandomInteger());
        countInteger++;
      }
      size = +byteSize(file);
      if (size > 2048) {
        break;
      }
    }

    const csvFile = file.join(",");
    return csvFile;
  };
  return (
    <div className="App">
      <CSVLink data={generateCSVFile()} filename={"my-file.csv"}>
        Download me
      </CSVLink>
    </div>
  );
}

export default App;
