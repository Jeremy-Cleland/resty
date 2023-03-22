import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/";

import App from "../App.jsx";

describe("App Component", () => {
  it("renders App", () => {
    render(<App />);
    const appElement = screen.getByText(/Jeremy Cleland/i);
    expect(appElement).toBeInTheDocument();
  });

  it("renders form use and renders results as expected"),
    () => {
      render(<App />);
      const appElement = screen.getByTestId("url");
      const appElement = screen.getByTestId("url");
      const appElement = screen.getByTestId("url");
      expect(appElement).toBeInTheDocument();
    };
});
