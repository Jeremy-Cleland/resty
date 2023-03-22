import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Results from ".";

describe("Results", () => {
  it("renders Results", () => {
    render(<Results />);

    const resultsElement = screen.getByTestId("results");
    expect(resultsElement).toBeInTheDocument();
  });
});
