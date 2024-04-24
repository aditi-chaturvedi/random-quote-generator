import "./App.css";
import React, { useState } from "react";
import volume from "./sound-full-icon.svg";
import copy from "./copy-file-icon.svg";
import twitter from "./twitter-line-icon.svg";
import quote from "./quote-left-icon.svg";
import axios from "axios";

const App = () => {
  const [quotedisplay, setQuotedisplay] = useState(
    "Learn as if you will live forever, live like you will die tomorrow."
  );
  const [author, setAuthor] = useState("Mahatma Gandhi");
  const colors = ["#C6F8E5", "#CCE1F2", "#F5CDDE", "#FBF7D5"];
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleClick = () => {
    const randomColor = getRandomColor();
    setCurrentColor(randomColor);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        setQuotedisplay(result.content);
        setAuthor(result.author);
      });
  };

  const soundHandleClick = () => {
    let speech = new SpeechSynthesisUtterance(`${quotedisplay} by ${author}`);
    speechSynthesis.speak(speech);
  };

  const copyHandleClick = () => {
    navigator.clipboard.writeText(quotedisplay);
  };

  const twitterHanldeClick = () => {
    const tweetText = encodeURIComponent(`${quotedisplay} by ${author}`);
    // Open Twitter with the pre-filled tweet text
    window.open(`http://twitter.com/intent/tweet?text=${tweetText}`);
  };

  const body = {
    backgroundColor:
      currentColor /* Apply the background color to the body class */,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight:
      "100vh" /* Ensures the content takes up at least the full viewport height */,
  };

  const listColour = {
    border: `2px solid ${currentColor}`,
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: currentColor,
  };

  return (
    <div style={body}>
      <div className="wrapper">
        <div>
          <h2 className="hed">Quote of the Day</h2>
        </div>
        <div className="content">
          <div className="quote-area">
            <p className="quote">
              <img src={quote} className="left" alt="quote-icon" />
              {quotedisplay}
            </p>
            <span className="author">--{author}</span>
            <div className="buttons">
              <ul>
                <li style={listColour} onClick={soundHandleClick}>
                  <img
                    src={volume}
                    className="volume"
                    alt="volume-icon"
                    style={{ cursor: "pointer" }}
                  />
                </li>
                <li style={listColour} onClick={copyHandleClick}>
                  <img
                    className="copy"
                    src={copy}
                    alt="copy-icon"
                    style={{ cursor: "pointer" }}
                  />
                </li>
                <li style={listColour}>
                  <img
                    onClick={twitterHanldeClick}
                    src={twitter}
                    className="twitter"
                    alt="twitter-icon"
                    style={{ cursor: "pointer" }}
                  />
                </li>
                <button style={listColour} onClick={handleClick}>
                  New Quote
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
