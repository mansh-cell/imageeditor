// src/components/Canvas.js
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const CanvassEditor = ({ imageSrc }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    console.log(imageSrc);
    const fabricCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (imageSrc && canvas) {
      const loadImage = (imageSrc) => {
        const image = new Image();
        image.onload = () => {
          console.log("Image loaded successfully");
          fabric.Image.fromURL(
            imageSrc,
            (img, error) => {
              if (error) {
                console.log("Error loading image:", error);
              } else {
                console.log("Fabric image loaded:", img);
                img.set({
                  left: 50,
                  right: 50,
                  top: 50,
                  selectable: true,
                  hasBorders: false,
                });
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                canvas.renderAll();
              }
            },
            { crossOrigin: "anonymous" }
          );
        };
        image.onerror = (error) => {
          console.log("Image loading failed:", error);
        };
        image.src = imageSrc;
      };

      loadImage(imageSrc);
    }
  }, [imageSrc, canvas]);

  const addText = () => {
    const text = new fabric.Textbox("Click to edit", {
      left: 300,
      top: 300,
      fontSize: 20,
      editable: true,
    });
    canvas.add(text);
  };

  const addShape = (shape) => {
    let shapeObj;
    if (shape === "circle") {
      shapeObj = new fabric.Circle({
        left: 300,
        top: 300,
        radius: 50,
        fill: "red",
        hasBorders: true,
      });
    } else if (shape === "rectangle") {
      shapeObj = new fabric.Rect({
        left: 300,
        top: 300,
        width: 100,
        height: 100,
        fill: "blue",
        hasBorders: true,
      });
    }
    canvas.add(shapeObj);
  };

  const downloadImage = () => {
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1.0,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-image.png";
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} width="1450px" height="800px"></canvas>
      <br />
      <button className="btn" onClick={addText}>
        Add Text
      </button>
      <button className="btn" onClick={() => addShape("circle")}>
        Add Circle
      </button>
      <button className="btn" onClick={() => addShape("rectangle")}>
        Add Rectangle
      </button>
      <button className="btn" onClick={downloadImage}>
        Download
      </button>
    </div>
  );
};

export default CanvassEditor;
