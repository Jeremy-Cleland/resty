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

  // Define function to call API
  const callApi = async (reqParams) => {
    // Set state
    const { method, url, body } = reqParams;
    setReqParams(reqParams);
    setIsLoading(true);

    // Make API call
    const res = await axios({
      method,
      url,
      data: body,
    });

    // Set state
    setResData({
      headers: res.headers,
      body: res.data,
    });
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <div className="container-app">
        <div className="method_container">
          Request Method: {reqParams.method}
        </div>
        <div className="url_container">URL: {reqParams.url}</div>
      </div>
      <Form handleApiCall={callApi} />
      <Results data={resData} isLoading={isLoading} />
      <Footer />
    </>
  );
}

export default App;
