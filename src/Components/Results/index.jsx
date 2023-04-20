import JSONPretty from "react-json-pretty";
var JSONPrettyAcai = require("react-json-pretty/dist/acai");

import "./Results.scss";

const Results = ({ data, isLoading }) => {
  return (
    <section>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <pre data-testid="results">
          {data ? (
            <pre className="response">
              <JSONPretty id="json-pretty" data={data} theme={JSONPrettyAcai} />
            </pre>
          ) : (
            <div className="placeholder" />
          )}
        </pre>
      )}
    </section>
  );
};

export default Results;
