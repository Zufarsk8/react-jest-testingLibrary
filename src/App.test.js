// import dependencies
import React from "react";

// import react-testing methods
import {
  render,
  fireEvent,
  waitForElement,
  screen,
} from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

// addd the component to test
import App from "./App";

// https://jestjs.io/docs/en/mock-functions#mocking-modules
jest.mock("axios");

test("loads and display greetings", async () => {
  const url = "/greeting";
  render(<App url={url} />);

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: "hello there" },
  });
  fireEvent.click(screen.getByText("Load Greeting"));
  // Wait until the mocked `get` request promise resolves and
  // the component calls setState and re-renders.
  // `waitFor` waits until the callback doesn't throw an error

  await waitForElement(() =>
    // getByRole throws an error if it cannot find an element
    screen.getByRole("heading")
  );

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toHaveAttribute("disabled");
});
