import React, { useEffect, useState } from "react";

const Snowfall = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Estilo para a neve
  const snowfallStyle = {
    position: "fixed", // Fixa a neve no fundo da tela
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "url('https://www.transparenttextures.com/patterns/snow.png') repeat", // Imagem de neve
    zIndex: -1, // Coloca a neve atrás do conteúdo
    animation: "snow 10s linear infinite",
  };

  // Definir a animação da neve
  const keyframes = `
    @keyframes snow {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 100%;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={snowfallStyle}></div>
    </>
  );
};

export default Snowfall;
