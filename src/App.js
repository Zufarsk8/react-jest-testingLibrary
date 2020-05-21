import React, { useState } from "react";
import axios from "axios";

function App({ url }) {
  const [greeting, setGreeting] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchGreeting = async () => {
    const response = await axios.get(url);
    const data = response.data;
    const { greeting } = data;
    setGreeting(greeting);
    setButtonClicked(true);
  };

  const buttonText = buttonClicked ? "Ok" : "Load Greeting";

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ margin: "auto" }}>
        <button
          style={{
            borderRadius: "2em",
            padding: "1em",
            border: "none",
            color: "white",
            backgroundColor: "#11264b",
          }}
          onClick={fetchGreeting}
          disabled={buttonClicked}
        >
          {buttonText}
        </button>
        {greeting ? <h1>{greeting}</h1> : null}
      </div>
    </div>
  );
}

export default App;
