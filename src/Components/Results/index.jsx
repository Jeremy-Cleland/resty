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
                <pre className="response" data-testid="results">
                  {JSON.stringify([data], null, 2)}
                </pre>
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
