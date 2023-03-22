import JSONPretty from "react-json-pretty";
var JSONPrettyAcai = require("react-json-pretty/dist/acai");

import "./Results.scss";
// var JSONPrettyMon = import("./custom.styl");

const Results = ({ isLoading, data }) => {
  return (
    <section>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <pre data-testid="results">
          {data ? (
            <pre className="response">
              <JSONPretty
                id="json-pretty"
                data={data}
                theme={JSONPrettyAcai}
              ></JSONPretty>
            </pre>
          ) : (
            <div className="placeholder"></div>
          )}
        </pre>
      )}
    </section>
  );
};

export default Results;
