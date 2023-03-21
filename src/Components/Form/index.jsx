import Card from "../Card";
import "./Form.scss";

const Form = ({ handleApiCall }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon",
    };
    handleApiCall(formData);
  };

  return (
    <Card className="form">
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input name="url" type="text" />
          <button type="submit">GO!</button>
        </label>
        <label className="methods" htmlFor="methods">
          <span id="get">GET</span>
          <span id="post">POST</span>
          <span id="put">PUT</span>
          <span id="delete">DELETE</span>
        </label>
      </form>
    </Card>
  );
};

export default Form;
