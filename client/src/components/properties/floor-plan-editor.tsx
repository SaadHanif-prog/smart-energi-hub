import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";
import toast from "react-hot-toast";
import useImage from "use-image";

// Types
import type {LineData, FloorPlanEditorProps} from "../../types/properties.types";

// Hooks
import { useAddPropertyDesignPattern, usePropertiesDesignPattern} from "../../hooks/properties.hook";

// Components
import DrawingLoader from "./drawing-loader";

const FloorPlanEditor = ({imageUrl, propertyIdForDesign, setIsFloorPlanEditorOpen}: FloorPlanEditorProps) => {
  const { mutate: addPropertyDesign } = useAddPropertyDesignPattern();
  const { data: propertyDesigns, isLoading } = usePropertiesDesignPattern();

  const [image] = useImage(imageUrl, "anonymous");
  const [lines, setLines] = useState<LineData[]>([]);
  const [color, setColor] = useState("#ff0000");
  const [width, setWidth] = useState(2);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  // Resize handler
  useEffect(() => {
    const updateSize = () => {
      if (!image) return;
      const maxWidth = window.innerWidth * 0.95;
      const maxHeight = window.innerHeight * 0.9;

      const aspectRatio = image.width / image.height;

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

  // Load initial design
  useEffect(() => {
    const intialDesign = propertyDesigns?.find(
      (prop) => prop.propertyId === propertyIdForDesign
    );
    if (intialDesign && intialDesign.lines.length > 0) {
      setLines(intialDesign.lines);
    } else {
      setLines([]);
    }
  }, [propertyIdForDesign, propertyDesigns]);

  // Drawing handlers
  const handleMouseDown = (e: any) => {
    if (!image) return;
    isDrawing.current = true;
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();

    const scaleX = image.width / stageSize.width;
    const scaleY = image.height / stageSize.height;

    setLines([
      ...lines,
      {
        points: [pos.x * scaleX, pos.y * scaleY],
        color,
        width,
        tool,
      },
    ]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current || !image) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const scaleX = image.width / stageSize.width;
    const scaleY = image.height / stageSize.height;

    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([
      point.x * scaleX,
      point.y * scaleY,
    ]);
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleUndo = () => setLines(lines.slice(0, -1));
  const handleClear = () => setLines([]);

  const handleSaveDrawing = async () => {
    addPropertyDesign(
      { propertyId: propertyIdForDesign, lines },
      {
        onSuccess: () => {
          toast.success("Drawing Saved!");
        },
      }
    );
  };


  if (isLoading) return <DrawingLoader/>;

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/80 p-5">
      {/* Toolbar */}
      <div className="mb-3 flex items-center gap-3 rounded-lg bg-neutral-900 px-4 py-2 text-white">
        <button
          onClick={() => setTool("pen")}
          className={`rounded px-3 py-1 ${
            tool === "pen" ? "bg-neutral-600" : "bg-neutral-800"
          }`}
        >
          Pen
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={`rounded px-3 py-1 ${
            tool === "eraser" ? "bg-neutral-600" : "bg-neutral-800"
          }`}
        >
          Eraser
        </button>

        <label className="flex items-center gap-2">
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === "eraser"}
          />
        </label>

        <label className="flex items-center gap-2">
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
          className="rounded bg-neutral-800 px-3 py-1"
        >
          Undo
        </button>

        <button
          onClick={handleClear}
          className="rounded bg-neutral-500 px-3 py-1"
        >
          Clear
        </button>

        <button
          onClick={handleSaveDrawing}
          className="rounded bg-blue-600 px-3 py-1"
        >
          Save Drawing
        </button>

        <button
          onClick={() => setIsFloorPlanEditorOpen(false)}
          className="rounded bg-red-600 px-3 py-1"
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
          className={`rounded-lg bg-white shadow-xl ${
            tool === "pen" ? "cursor-crosshair" : "cursor-cell"
          }`}
        >
          <Layer>
            <KonvaImage
              image={image}
              width={stageSize.width}
              height={stageSize.height}
            />
          </Layer>
          <Layer>
            {lines.map((line, i) => {
              if (!image) return null;
              const scaleX = stageSize.width / image.width;
              const scaleY = stageSize.height / image.height;
              const scaledPoints = line.points.map((p, idx) =>
                idx % 2 === 0 ? p * scaleX : p * scaleY
              );

              return (
                <Line
                  key={i}
                  points={scaledPoints}
                  stroke={line.color}
                  strokeWidth={line.width}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              );
            })}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default FloorPlanEditor;

