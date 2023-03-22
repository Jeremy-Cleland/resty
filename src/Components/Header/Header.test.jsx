import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from ".";

describe("Header", () => {
  it("renders Header", () => {
    render(<Header />);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });
});
