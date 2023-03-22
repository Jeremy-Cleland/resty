import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/";
import Footer from ".";

describe("Footer", () => {
  it("renders Footer", () => {
    render(<Footer />);
    const footerElement = screen.getByText(/Jeremy Cleland/i);
    expect(footerElement).toBeInTheDocument();
  });
});
