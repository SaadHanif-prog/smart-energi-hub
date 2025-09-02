const DrawingLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <img className="w-48" src="/images/drawing.gif"/>
      </div>
    </div>
  );
};

export default DrawingLoader;
