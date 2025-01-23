// src/components/Canvas.js
import React, { useEffect, useRef, useState } from "react";
import fabric from "fabric";

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
      fabric.Image.fromURL(imageSrc, (img, error) => {
        if (error) {
          console.log(error);
        }
        console.log(img);
        img.set({
          left: 0,
          top: 0,
          selectable: true,
          hasborders: false,
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        canvas.renderAll();
      });
    }
  }, [imageSrc, canvas]);

  const addText = () => {
    const text = new fabric.Textbox("Click to edit", {
      left: 50,
      top: 50,
      fontSize: 20,
      editable: true,
    });
    canvas.add(text);
  };

  const addShape = (shape) => {
    let shapeObj;
    if (shape === "circle") {
      shapeObj = new fabric.Circle({
        left: 50,
        top: 50,
        radius: 50,
        fill: "red",
        hasBorders: true,
      });
    } else if (shape === "rectangle") {
      shapeObj = new fabric.Rect({
        left: 100,
        top: 100,
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
      <canvas ref={canvasRef} width="1200px" height="900px"></canvas>
      <button onClick={addText}>Add Text</button>
      <button onClick={() => addShape("circle")}>Add Circle</button>
      <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
};

export default CanvassEditor;
