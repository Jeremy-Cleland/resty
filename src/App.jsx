import { useEffect, useReducer } from "react";
import axios from "axios";

import Header from "./Components/Header";
import History from "./Components/History/History";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Results from "./Components/Results";

import "./App.scss";

function App() {
  const initalState = {
    reqParams: {},
    data: null,
    isLoading: false,
    history: [],
  };

  const switchReducer = (state = initalState, action) => {
    switch (action.type) {
      case "setReqParams":
        return { ...state, reqParams: action.payload };
      case "setData":
        return { ...state, data: action.payload };
      case "setIsLoading":
        return { ...state, isLoading: action.payload };
      case "setHistory":
        return { ...state, history: [...state.history, action.payload] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(switchReducer, initalState);

  const { reqParams, data, isLoading, history } = state;

  useEffect(() => {
    if (reqParams.url) {
      dispatch({ type: "setIsLoading", payload: true });
      callApi(reqParams);
    }
  }, [reqParams]);

  const updateParams = (reqParams) => {
    dispatch({ type: "setReqParams", payload: reqParams });
    dispatch({ type: "setHistory", payload: reqParams });
    // dispatch({ type: "UPDATE_HISTORY", payload: [...history, reqParams] });
  };

  // Define function to call API

  const callApi = async (reqParams) => {
    const { method, url, body } = reqParams;

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
        dispatch({
          type: "setData",
          payload: {
            headers: res.headers,
            body: res.data,
            status: res.status,
          },
        });

        dispatch({ type: "setIsLoading", payload: false });
      }
    } catch (error) {
      dispatch({
        type: "setData",
        payload: {
          headers: error.res.headers,
          body: error.res.data,
          status: error.res.status,
        },
      });
      dispatch({ type: "setIsLoading", payload: false });
    }
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
      <Form handleApiCall={callApi} updateParams={updateParams} />
      <Results data={data} isLoading={isLoading} data-testid="json-body" />
      <History history={history} updateParams={updateParams} />

      <Footer />
    </>
  );
}

export default App;
