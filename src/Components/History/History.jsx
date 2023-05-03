import "./History.scss";

const History = ({ history, changeHistory }) => {
  return (
    <div className="history-container">
      <div className="history">
        <h3>History</h3>
        <ul className="container">
          {history.map((item, idx) => (
            <li className="history_list" key={`history-${idx}`}>
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
