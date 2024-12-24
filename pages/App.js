import React, { useState, useEffect } from "react";
import Snowfall from "./components/Snowfall";
import Challenge from "./components/Challenge";
import FinalMessage from "./components/FinalMessage";
import ImageGallery from "./components/ImageGallery";
import AudioPlayer from "./components/AudioPlayer";

const App = () => {
  const [finished, setFinished] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [audioHeight, setAudioHeight] = useState(0);
  const [questionsHeight, setQuestionsHeight] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const audioElement = document.getElementById("audio-player");
    const questionElement = document.getElementById("question-area");

    if (audioElement) setAudioHeight(audioElement.clientHeight);
    if (questionElement) setQuestionsHeight(questionElement.clientHeight);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      if (audioElement) setAudioHeight(audioElement.clientHeight);
      if (questionElement) setQuestionsHeight(questionElement.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.margin = 0;
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.color = "white";
  }, []);

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <Snowfall />
      <AudioPlayer />
      <ImageGallery
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        audioHeight={audioHeight}
        questionsHeight={questionsHeight}
      />
      <div id="question-area" style={{ position: "relative", zIndex: 1 }}>
        {finished ? (
          <FinalMessage />
        ) : (
          <Challenge onFinish={() => setFinished(true)} />
        )}
      </div>
    </div>
  );
};

export default App;
