import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

const ImageGallery = ({
  windowWidth,
  windowHeight,
  audioHeight,
  questionsHeight,
}) => {
  const [imageSize, setImageSize] = useState(0);
  const positionsRef = useRef([]); // Usamos useRef para manter as posições sem causar re-render

  // Usar useMemo para evitar recriar a lista de imagens em cada renderização
  const imageList = useMemo(
    () => [
      "0.png",
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
      "8.png",
      "9.png",
    ],
    [],
  );

  useEffect(() => {
    const calculateImageSize = () => {
      const size = Math.min(windowWidth * 0.15, 150); // Ajuste do tamanho para não sobrecarregar
      setImageSize(size);
    };
    calculateImageSize();

    // Função para calcular as posições das imagens
    const calculatePositions = () => {
      const newPositions = [];
      imageList.forEach(() => {
        let top, left;
        let tries = 0;

        // Tentamos distribuir as imagens sem sobrepor
        do {
          top = Math.random() * (windowHeight - imageSize - audioHeight - 20);
          left = Math.random() * (windowWidth - imageSize - 20);
          tries += 1;

          if (tries > 100) break;
        } while (
          newPositions.some(
            (pos) =>
              Math.sqrt(Math.pow(left - pos.x, 2) + Math.pow(top - pos.y, 2)) <
              imageSize * 1.5,
          ) ||
          // Verificando se a imagem está sobrepondo a área do áudio ou das perguntas
          top + imageSize > windowHeight - audioHeight ||
          top < questionsHeight
        );

        newPositions.push({ x: left, y: top });
      });

      positionsRef.current = newPositions; // Armazenamos as posições calculadas no useRef
    };

    calculatePositions();
  }, [
    imageSize,
    windowWidth,
    windowHeight,
    audioHeight,
    questionsHeight,
    imageList,
  ]);

  return (
    <>
      {imageList.map((image, index) => {
        const { x, y } = positionsRef.current[index] || {}; // Usamos a referência para acessar as posições
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)",
              zIndex: -1,
              opacity: 0.8,
            }}
          >
            <Image
              src={`/images/xmas/${image}`}
              alt={`Imagem de Natal ${index}`}
              width={imageSize} // Largura calculada
              height={imageSize} // Altura calculada
              style={{
                borderRadius: "10px",
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default ImageGallery;
