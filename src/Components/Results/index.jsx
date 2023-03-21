import Card from "../Card";
import "./Results.scss";

const Results = ({ data }) => {
  return (
    <>
      {data ? (
        <Card>
          <pre>{JSON.stringify(data, undefined, 2)}</pre>
        </Card>
      ) : <div className="placeholder"></div>}
    </>
  );
};

export default Results;
