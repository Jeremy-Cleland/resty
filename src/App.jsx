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

  const switchReducer = (action, state = initalState) => {
    switch (action.type) {
      case "START_REQUEST":
        return {
          ...state,
          reqParams: action.payload,
        };
      case "END_REQUEST":
        return {
          ...state,
          isLoading: false,
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

  const [state, dispatch] = useReducer(switchReducer, initalState);

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
        payload: error.res.data,
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
    (async () => {
      await getData();
    })();
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
        isLoading={state.isLoading}
        data-testid="json-body"
      />
      <Footer />
    </>
  );
}
export default App;
