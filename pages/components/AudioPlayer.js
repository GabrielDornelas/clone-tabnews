import React, { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Erro ao tentar reproduzir o áudio:", error);
      });
    }
  }, []);

  return (
    <div
      id="audio-player"
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        zIndex: 2,
      }}
    >
      <audio ref={audioRef} controls loop autoPlay>
        <source src="/xmas.mp3" type="audio/mp3" />
        Seu navegador não suporta a tag de áudio.
      </audio>
    </div>
  );
};

export default AudioPlayer;
