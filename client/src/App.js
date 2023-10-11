import React, { Component } from "react";
import HistoryModal from "./components/modal";
import { allowedOperations, baseURL } from "./utils/constants";

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      inputted: "",
      result: "",
      operation: "",
      history: [],
      isModalOpen: false,
    };
  }

  componentDidMount() {
    fetch(`${baseURL}history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        this.setState({ history: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOperationClick = (string) => {
    const { inputted } = this.state;
    if (!inputted) return;
    this.Inputted.focus();
    const contains = allowedOperations.some((opt) => inputted.includes(opt));
    if (string === "<") {
      this.setState({ inputted: "" });
    } else if (contains) {
      const split = inputted.split("");
      if (allowedOperations.includes(split[split.length - 1])) {
        split.pop();
        const joined = split.join("") + string;
        this.setState({ inputted: joined });
      } else return;
    } else {
      this.setState({ operation: string });
      this.setState({ inputted: inputted + string });
    }
  };

  handleNumberClick = async (number) => {
    const { inputted } = this.state;
    this.Inputted.focus();
    if (document.activeElement === this.Inputted) {
      this.setState({ inputted: inputted + number });
    }
  };

  calculateResult = () => {
    const { inputted, operation } = this.state;
    if (!operation) {
      return this.setState({ result: inputted });
    }
    const numbers = inputted.split(operation);
    const num1 = numbers[0];
    const num2 = numbers[1];

    if (num1 === "" || num2 === "") {
      alert("Please enter both numbers.");
      return;
    }

    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);

    let apiEndpoint = baseURL;
    switch (operation) {
      case "+":
        apiEndpoint += "add";
        break;
      case "-":
        apiEndpoint += "subtract";
        break;
      case "x":
        apiEndpoint += "multiply";
        break;
      case "/":
        apiEndpoint += "divide";
        break;
      default:
        break;
    }

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num1: parsedNum1, num2: parsedNum2 }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ result: data, inputted: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    const { isModalOpen, history } = this.state;
    return (
      <div className="max-w-sm mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Calculator</h1>
        <div className="flex flex-wrap justify-between mb-4 space-x-4">
          <input
            type="text"
            name="inputted"
            data-testid="inputted-test"
            placeholder=""
            value={this.state.inputted}
            onChange={this.handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-right text-xl focus:outline-none"
            ref={(input) => (this.Inputted = input)}
          />
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2">
            {["+", "-", "/", "x"].map((operation) => (
              <button
                key={operation}
                onClick={() => this.handleOperationClick(operation)}
                className="w-full h-16 bg-gray-200 rounded-lg text-xl text-center flex items-center justify-center hover:bg-gray-300 focus:outline-none"
              >
                {operation}
              </button>
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
              <button
                key={number}
                data-testid={`${number}-test`}
                onClick={() => this.handleNumberClick(number.toString())}
                className="w-full h-16 bg-gray-200 rounded-lg text-xl text-center flex items-center justify-center hover:bg-gray-300 focus:outline-none"
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => this.handleOperationClick("<")}
              className="w-full h-16 bg-gray-200 rounded-lg text-xl text-center flex items-center justify-center hover:bg-gray-300 focus:outline-none"
            >
              Clear
            </button>
            <button
              onClick={this.calculateResult}
              className="w-full h-16 bg-blue-500 text-white rounded-lg text-xl text-center flex items-center justify-center hover:bg-blue-600 focus:outline-none"
            >
              =
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold">
            Result: {this.state.result || "___"}
          </p>

          <button
            data-testid="show-history-button"
            onClick={this.toggleModal}
            className="h-14 p-4 bg-blue-500 text-white rounded-lg text-xl text-center flex items-center justify-center hover:bg-blue-600 focus:outline-none"
          >
            Show History
          </button>
          {isModalOpen && (
            <HistoryModal toggleModal={this.toggleModal} history={history} />
          )}
        </div>
      </div>
    );
  }
}

export default Calculator;
