import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";
import toast from "react-hot-toast";
import useImage from "use-image";

// Types
import type {LineData, FloorPlanEditorProps } from "../../types/properties.types";

// Hooks
import {useAddPropertyDesignPattern} from "../../hooks/properties.hook"

const FloorPlanEditor = ({imageUrl, propertyIdForDesign, setIsFloorPlanEditorOpen,}: FloorPlanEditorProps) => {

  const { mutate: addPropertyDesign } = useAddPropertyDesignPattern();
  

  const [image] = useImage(imageUrl, "anonymous");
  const [lines, setLines] = useState<LineData[]>([]);
  const [color, setColor] = useState("#ff0000");
  const [width, setWidth] = useState(2);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const maxWidth = window.innerWidth * 0.95;
      const maxHeight = window.innerHeight * 0.9;

      const aspectRatio =
        image?.width && image?.height ? image.width / image.height : 4 / 3;

      let width = maxWidth;
      let height = width / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setStageSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [image]);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], color, width, tool }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines(lines.slice(0, -1).concat(lastLine));
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

  const handleClear = () => {
    setLines([]);
  };

 const handleSaveDrawing = async () => {
  console.log("propertyId", propertyIdForDesign)
  addPropertyDesign({propertyId: propertyIdForDesign, lines} , {
      onSuccess: () => {
        toast.success("Drawing Saved!");
      },
    });
};


  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        flexDirection: "column",
        padding: "20px",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "12px",
          background: "#222",
          padding: "10px 16px",
          borderRadius: "8px",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <button
          onClick={() => setTool("pen")}
          style={{
            background: tool === "pen" ? "#555" : "#333",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Pen
        </button>
        <button
          onClick={() => setTool("eraser")}
          style={{
            background: tool === "eraser" ? "#555" : "#333",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Eraser
        </button>

        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === "eraser"}
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          Brush:
          <input
            type="range"
            min="1"
            max="20"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>

        <button
          onClick={handleUndo}
          style={{
            background: "#333",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Undo
        </button>

        <button
          onClick={handleClear}
          style={{
            background: "#999",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear
        </button>

        <button
          onClick={handleSaveDrawing}
          style={{
            background: "#0a84ff",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Drawing
        </button>

        <button
          onClick={() => setIsFloorPlanEditorOpen(false)}
          style={{
            background: "#ff3b30",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>

      {/* Canvas */}
      {stageSize.width > 0 && (
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          ref={stageRef}
          style={{
            cursor: tool === "pen" ? "crosshair" : "cell",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          }}
        >
          <Layer>
            <KonvaImage
              image={image}
              width={stageSize.width}
              height={stageSize.height}
            />
          </Layer>
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.width}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default FloorPlanEditor;
