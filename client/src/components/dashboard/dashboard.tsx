type Stat = {
  label: string;
  value: number;
  color?: string;
};

type DashboardCardProps = {
  title: string;
  total: number;
  stats: Stat[];
};

const DashboardCard = ({ title, total, stats }: DashboardCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="text-textLight">
        <div className="border-b border-b-gray-200 pb-3">
          <div className="flex justify-between ">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="text-right text-sm border-b">TOTAL</div>
          </div>
          <div className="text-right text-3xl font-semibold">{total}</div>
        </div>
      </div>

      <div className="space-y-1 mt-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex justify-between">
            <span className={`font-medium ${stat.color}`}>{stat.label}</span>
            <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
