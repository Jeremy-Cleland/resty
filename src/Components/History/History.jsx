const History = (props) => {
  const { history, updateParams } = props;

  const handleClick = (reqParams) => {
    updateParams(reqParams);
  };

  return (
    <div>
      <h3>History</h3>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            <button onClick={() => handleClick(item.reqParams)}>
              {idx + 1} {item.reqParams.method} {item.reqParams.url}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
