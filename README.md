# React Masked Input

A lightweight Input masking for React input components.

react-masked-input requires **React 16.8.0 or later.**

# Installation

`npm install @mahiraltinkaya/react-masked-input`

# Usage

| Character | Allowed input |
| :-------: | :-----------: |
|     #     |     [0-9]     |
|     a     |   [A-Za-z]    |
|    \*     |  [A-Za-z0-9]  |

### `Separators`

You can use lots of type separators. But you can't use #, a, \* for separating. Also you can use static values.

|     Examples      |     Responses     |
| :---------------: | :---------------: |
|  ###-aaa/\*\*\*   |    123-ABC/1EF    |
|    ##:## a.m.     |    12:12 a.m.     |
| +90 ### ### ## ## | +90 555 555 55 55 |
|    (##3):(#12)    |    (123):(112)    |

```jsx
import React from "react";
import MaskedInput from "./react-masked-input";
import "./App.css";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

function App() {
  const [value, setValue] = React.useState("");
  const [timeFormat, setTimeFormat] = React.useState("");
  const [date, setDate] = React.useState("");

  return (
    <>
      <div
        style={{
          width: 250,
          padding: "5em",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MaskedInput
          mask="+90 (###) ### ## ##"
          value={value}
          placeholder={"+90 (555) 555 55 55"}
          size={"x-large"}
          color={"warning"}
          onChange={setValue}
        >
          <TextField></TextField>
        </MaskedInput>

        <MaskedInput
          mask="##:##"
          value={timeFormat}
          placeholder={"12:12"}
          onChange={setTimeFormat}
        ></MaskedInput>

        <MaskedInput
          mask="##/##/####"
          value={date}
          placeholder={"12/12/2023"}
          onChange={setDate}
        ></MaskedInput>

        <MaskedInput
          mask="TR## #### #### #### #### #### ##"
          value={date}
          placeholder={"TR16 9090 9090 9090 9090 9090 90"}
          onChange={setDate}
        ></MaskedInput>
      </div>
    </>
  );
}

export default App;
```
