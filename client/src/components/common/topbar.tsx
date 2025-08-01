type TopBarProps = {
  title: string;
  definition: string;
};

const TopBar = ({ title, definition }: TopBarProps) => {
  return (
    <div className="h-18 pl-2 bg-white flex flex-col justify-center">
      <h2 className="font-bold text-textLight">{title}</h2>
      <p className="text-textLight">{definition}</p>
    </div>
  );
};

export default TopBar;
