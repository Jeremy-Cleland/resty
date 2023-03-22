import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/";

import App from "../App.jsx";

describe("App", () => {
  it("renders App", () => {
    render(<App />);
    const appElement = screen.getByText(/Jeremy Cleland/i);
    expect(appElement).toBeInTheDocument();
  });
});
