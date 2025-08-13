export type FloorPlanEditorProps = {
  imageUrl: string;
  setIsFloorPlanEditorOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type LineData = {
  points: number[];
  color: string;
  width: number;
  tool: "pen" | "eraser";
}
