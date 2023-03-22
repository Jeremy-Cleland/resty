import { useState } from "react";

import Card from "../Card";
import "./Form.scss";

const Form = (props) => {
  const { handleApiCall } = props;
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      method: method,
      url: url,
      body: body,
    };
    handleApiCall(formData);
  };

  return (
    <Card className="card1">
      <div className="form">
        <form data-testid="form" onSubmit={handleSubmit}>
          <label>
            <span>URL: </span>
            <input
              data-testid="input"
              name="url"
              type="text"
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
          <label htmlFor="methods" className="methods">
            <span>Choose Method</span>
            <button
              id="get"
              className={method === "GET" ? "active" : null}
              type="button"
              onClick={() => setMethod("GET")}
            >
              GET:
            </button>
            <button
              id="post"
              className={method === "POST" ? "active" : null}
              type="button"
              onClick={() => setMethod("POST")}
            >
              POST
            </button>
            <button
              id="put"
              className={method === "PUT" ? "active" : null}
              type="button"
              onClick={() => setMethod("PUT")}
            >
              PUT
            </button>
            <button
              id="delete"
              className={method === "DELETE" ? "active" : null}
              type="button"
              onClick={() => setMethod("DELETE")}
            >
              DELETE
            </button>
          </label>
          {method === "PUT" || method === "POST" ? (
            <>
              <label>
                <span>JSON Request Body: </span>
                <textarea
                  name="body"
                  onChange={(event) => setBody(event.target.value)}
                />
              </label>
            </>
          ) : null}
          <button className="formButton" data-testid="formButton" type="submit">
            GO!
          </button>
        </form>
      </div>
    </Card>
  );
};

export default Form;

{
  /* <label htmlFor="methods" className="methods">
  Select your method:
  <select name="selectedMethod">
    <option value="GET">GET</option>
    <option value="POST">POST</option>
    <option value="PUT">PUT</option>
    <option value="DELETE">DELETE</option>
  </select>
</label>; */
}
