import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Form from ".";

describe("Form", () => {
  it("renders Form", () => {
    render(<Form />);
    const formElement = screen.getByTestId("form");
    expect(formElement).toBeInTheDocument();
  });

  it("renders a URL input", () => {
    render(<Form />);
    const urlInput = screen.getByLabelText(/URL/i);
    expect(urlInput).toBeInTheDocument();
  });
});
