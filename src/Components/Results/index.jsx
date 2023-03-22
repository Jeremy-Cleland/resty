import React from "react";

import "./Results.scss";

const Results = ({ isLoading, data }) => {
  return (
    <>
      {isLoading ? (
        <>
          <p>Loading....</p>
        </>
      ) : (
        <>
          <section>
            {data ? (
              <>
                <textarea className="response" data-testid="results">
                  {JSON.stringify([data], null, 2)}
                </textarea>
              </>
            ) : (
              <div className="placeholder"></div>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Results;
