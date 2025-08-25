type TopBarProps = {
  title: string;
  definition: string;
  action?: React.ReactNode;
};

const TopBar = ({ title, definition, action }: TopBarProps) => {
  return (
    <div className="h-18 pl-2 bg-white flex items-center justify-between px-4">
      <div className="flex flex-col justify-center">
        <h2 className="font-bold text-textLight">{title}</h2>
        <p className="text-textLight">{definition}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default TopBar;
