import { useEffect, useReducer } from "react";
import axios from "axios";

import Header from "./Components/Header";
import History from "./Components/History/History";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Results from "./Components/Results";

import "./App.scss";

function App() {
  const initialState = {
    reqParams: {},
    data: null,
    isLoading: false,
    history: [],
  };

  const switchReducer = (state, action) => {
    switch (action.type) {
      case "START_REQUEST":
        return {
          ...state,
          reqParams: action.payload,
          isLoading: true, // set isLoading to true on start request
        };
      case "END_REQUEST":
        return {
          ...state,
          isLoading: false, // set isLoading to false on end request
          data: action.payload,
          history: [
            ...state.history,
            { reqParams: { ...state.reqParams }, data: action.payload },
          ],
        };
      case "CHANGE_HISTORY":
        return { ...state, ...state.history[action.payload] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(switchReducer, initialState);

  const callApi = (reqParams) => {
    const action = {
      type: "START_REQUEST",
      payload: reqParams,
    };
    dispatch(action);
  };

  const getData = async () => {
    const { method, url, body } = state.reqParams;
    try {
      if (!url || !method) {
        throw new Error("Please enter a valid URL && Method");
      } else if ((method === "PUT" || method === "POST") && !body) {
        throw new Error("Please enter a valid body");
      } else {
        const res = await axios(state.reqParams);
        const action = {
          type: "END_REQUEST",
          payload: res.data,
        };
        dispatch(action);
      }
    } catch (error) {
      const action = {
        type: "END_REQUEST",
        payload: error.response.data, // fix error handling
      };
      dispatch(action);
    }
  };

  const changeHistory = (idx) => {
    const action = {
      type: "CHANGE_HISTORY",
      payload: idx,
    };
    dispatch(action);
  };

  useEffect(() => {
    if (state.reqParams.method && state.reqParams.url) {
      // add guard condition
      (async () => {
        await getData();
      })();
    }
  }, [state.reqParams]);

  return (
    <>
      <Header />
      <div className="container-app">
        <div className="method_container">
          Request Method: {state.reqParams.method}
        </div>
        <div className="url_container">URL: {state.reqParams.url}</div>
      </div>
      <History history={state.history} changeHistory={changeHistory} />
      <Form handleApiCall={callApi} />
      <Results
        data={state.data}
        isLoading={state.isLoading} // pass isLoading to Results component
        data-testid="json-body"
      />
      <Footer />
    </>
  );
}

export default App;
