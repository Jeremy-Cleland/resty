const History = ({ history, updateParams }) => {
  const handleClick = (reqParams) => {
    updateParams(reqParams);
  };

  return (
    <div>
      <h3>History</h3>
      <ul>
        <li>
          {history.map((item, idx) => (
            <button onClick={() => handleClick(item.reqParams)} key={idx}>
              {idx + 1} {item.method} {item.url}
            </button>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default History;
