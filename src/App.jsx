import { useState } from "react";
import axios from "axios";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Results from "./Components/Results";
import "./App.scss";

function App() {
  // Define state
  const [resData, setResData] = useState(null);
  const [reqParams, setReqParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (reqParams) => {
    const { method, url, body } = reqParams;
    setReqParams(reqParams);
    setIsLoading(true);

    const res = await axios({
      method,
      url,
      data: body,
    });

    setResData({
      headers: res.headers,
      body: res.data,
    });
    setIsLoading(false);
  };
  return (
    <>
      <Header />
      <div>Request Method: {reqParams.method}</div>
      <div>URL: {reqParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={resData} isLoading={isLoading} />
      <Footer />
    </>
  );
}

export default App;
