import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import Form from "../Components/Form";
import Results from "../Components/Results";

const server = setupServer(
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    return res(
      ctx.json({
        count: 1281,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        previous: null,
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
          {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon/2/",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Form Mock Server Test", () => {
  test("Should render the form", () => {
    render(<Form />);
    const form = screen.getByTestId("form");
    const input = screen.getByTestId("input");

    expect(form).toBeInTheDocument();

    expect(input).toBeInTheDocument();
  });

  test("should handleSubmit when the form is submitted", () => {
    const reqParamsUpdate = jest.fn();
    render(<Form reqParamsUpdate={reqParamsUpdate} />);

    const formButton = screen.getByText("GO!");

    fireEvent.click(formButton);

    expect(reqParamsUpdate).toHaveBeenCalled();
  });

  test("that the input updates the url when changed in the input field", () => {
    const reqParamsUpdate = jest.fn();

    render(<Form reqParamsUpdate={reqParamsUpdate} />);

    const input = screen.getByTestId("input");

    fireEvent.change(input, {
      target: { value: "https://pokeapi.co/api/v2/pokemon" },
    });

    expect(input.value).toBe("https://pokeapi.co/api/v2/pokemon");
  });

  test("that it renders the reuslts when the form is submitted using the form submit button", async () => {
    const reqParamsUpdate = jest.fn();

    const data = {
      count: 1281,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      previous: null,
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
        {
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/",
        },
      ],
    };

    render(
      <>
        <Form reqParamsUpdate={reqParamsUpdate} />
        <Results data={data} />
      </>
    );

    const input = screen.getByTestId("input");
    const formButton = screen.getByTestId("form-button");

    fireEvent.click(input, {
      target: { value: "https://pokeapi.co/api/v2/pokemon" },
    });

    fireEvent.click(formButton);

    const results = await screen.findByTestId("results");
    expect(results).toBeInTheDocument();

    const resultsList = await screen.findByTestId("results");
    expect(resultsList).toBeInTheDocument();
  });
});
