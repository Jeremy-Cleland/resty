import "./History.scss";

const History = ({ history, changeHistory }) => {
  return (
    <div className="history">
      <div>
        <h3>History</h3>
        <ul className="history-list">
          {history.map((item, idx) => (
            <li key={`history-${idx}`}>
              <button onClick={() => changeHistory(item.reqParams)}>
                {item.reqParams.method.toUpperCase()} {"  "}
                {item.reqParams.url}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
