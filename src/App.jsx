import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Results from "./Components/Results";

import "./App.scss";

function App() {
  // Define state
  const [data, setData] = useState(null);
  const [reqParams, setReqParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (reqParams.url) {
      callApi(reqParams);
      console.log("useEffect");
    }
  }, [reqParams]);

  const reqParamsUpdate = (reqParams) => {
    setReqParams(reqParams);
  };

  // Define function to call API
  const callApi = async (reqParams) => {
    const { method, url, body } = reqParams;
    setIsLoading(true);

    try {
      if (!url || !method) {
        throw new Error("Please enter a valid URL && Method");
      } else if ((method === "PUT" || method === "POST") && !body) {
        throw new Error("Please enter a valid body");
      } else {
        const res = await axios({
          method,
          url,
          data: body,
        });
        setData({
          headers: res.headers,
          body: res.data,
          status: res.status,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setData({
        headers: error.res.headers,
        body: error.rese.data,
        status: error.res.status,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container-app">
        <div className="method_container">
          Request Method:{" "}
          {reqParams.method ? reqParams.method.toUpperCase() : ""}
        </div>
        <div className="url_container">
          URL:{""} {reqParams.url}
        </div>
      </div>
      <Form handleApiCall={callApi} reqParamsUpdate={reqParamsUpdate} />
      <Results data={data} isLoading={isLoading} />
      <Footer />
    </>
  );
}

export default App;
