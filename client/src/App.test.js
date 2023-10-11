import React from "react";
import { render, screen } from "@testing-library/react";
import Calculator from "./App";
import { act } from "react-dom/test-utils";
import { testTimeout } from "./utils/constants";

test("renders Calculator component", () => {
  render(<Calculator />);
  const headerElement = screen.getByText(/Calculator/i);
  expect(headerElement).toBeInTheDocument();
});

test("adds two numbers correctly", async () => {
  render(<Calculator />);
  const input = screen.getByTestId("inputted-test");
  const addButton = screen.getByText("+");
  const oneButton = screen.getByTestId("1-test");
  const zeroButton = screen.getByTestId("0-test");
  const fourButton = screen.getByTestId("4-test");
  const equalsButton = screen.getByText("=");
  act(() => {
    oneButton.click();
  });

  act(() => {
    zeroButton.click();
  });

  act(() => {
    addButton.click();
  });

  act(() => {
    fourButton.click();
  });

  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, testTimeout);
      equalsButton.click();
    });
  });
  const resultElement = screen.getByText("Result: 14");
  expect(resultElement).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test("subtracts two numbers correctly", async () => {
  render(<Calculator />);
  const input = screen.getByTestId("inputted-test");
  const subtractButton = screen.getByText("-");
  const sevenButton = screen.getByTestId("7-test");
  const zeroButton = screen.getByTestId("0-test");
  const fourButton = screen.getByTestId("4-test");
  const equalsButton = screen.getByText("=");
  act(() => {
    sevenButton.click();
  });

  act(() => {
    zeroButton.click();
  });

  act(() => {
    subtractButton.click();
  });

  act(() => {
    fourButton.click();
  });

  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, testTimeout);
      equalsButton.click();
    });
  });
  const resultElement = screen.getByText("Result: 66");
  expect(resultElement).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test("multiplies two numbers correctly", async () => {
  render(<Calculator />);
  const input = screen.getByTestId("inputted-test");
  const multiplyButton = screen.getByText("x");
  const sevenButton = screen.getByTestId("7-test");
  const fourButton = screen.getByTestId("4-test");
  const equalsButton = screen.getByText("=");
  act(() => {
    sevenButton.click();
  });

  act(() => {
    multiplyButton.click();
  });

  act(() => {
    fourButton.click();
  });

  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, testTimeout);
      equalsButton.click();
    });
  });

  const resultElement = screen.getByText("Result: 28");
  expect(resultElement).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test("divides two numbers correctly", async () => {
  render(<Calculator />);
  const input = screen.getByTestId("inputted-test");
  const divideButton = screen.getByText("/");
  const sevenButton = screen.getByTestId("7-test");
  const zeroButton = screen.getByTestId("0-test");
  const equalsButton = screen.getByText("=");
  act(() => {
    sevenButton.click();
  });

  act(() => {
    zeroButton.click();
  });
  act(() => {
    divideButton.click();
  });

  act(() => {
    sevenButton.click();
  });

  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, testTimeout);
      equalsButton.click();
    });
  });

  const resultElement = screen.getByText("Result: 10");
  expect(resultElement).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test("handles clear button correctly", () => {
  render(<Calculator />);
  const clearButton = screen.getByText("Clear");
  const divideButton = screen.getByText("/");
  const sevenButton = screen.getByTestId("7-test");
  const zeroButton = screen.getByTestId("0-test");
  act(() => {
    sevenButton.click();
  });

  act(() => {
    zeroButton.click();
  });

  act(() => {
    divideButton.click();
  });
  const checkElement = screen.getByDisplayValue("70/");
  expect(checkElement).toBeInTheDocument();
  act(() => {
    clearButton.click();
  });
  const resultElement = screen.queryByText("70/");
  expect(resultElement).toBeNull();
});

test("toggles the history modal", () => {
  render(<Calculator />);

  expect(screen.queryByText("Calculation History")).toBeNull();
  const showHistoryButton = screen.getByTestId("show-history-button");

  act(() => {
    showHistoryButton.click();
  });

  const resultElement = screen.getByText("Calculation History");
  expect(resultElement).toBeInTheDocument();

  const closeElement = screen.getByTestId("close-button");

  act(() => {
    closeElement.click();
  });

  expect(screen.queryByText("Calculation History")).toBeNull();
});
