# Calculator App

This is a simple calculator application built with NestJS(Node, Express and MongoDB) and React.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed.
- MongoDB installed and running (required for the NestJS server).

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/igmrrf/calculator
```

## Backend Setup (NestJS)

### Navigate to the backend directory:

After cloning the repository, run this command
`cd calculator/server`

### Install dependencies:

Then install the dependencies, I used `yarn` but either yarn or npm or bun or pnpm can handle the installation
`npm install`

### Environmental Variables

After installing the dependencies create a .env file from sample in .env.sample
`touch .env`

### Start the NestJS server:

`npm start:dev`
The server should now be running at http://localhost:PORT.(you had set in your .env)

### API Documentation

A mini-api documentation with Swagger can be found at '/api' of your backend server.
Given the server was running on port 4030, that would be `http://localhost:4030/api/
`

## Frontend Setup (Reactjs)

### Navigate to the frontend directory:

`cd calculator/client`

### Install dependencies:

`npm install`

### Start the React application:

`npm start`

The React app should now be running at http://localhost:3000.

## Usage:

Access the calculator app by visiting http://localhost:3000 in your web browser.

## Features:

- Basic arithmetic operations: addition, subtraction, multiplication, and division.
- Calculation history display.
- Modal to show calculation history.
