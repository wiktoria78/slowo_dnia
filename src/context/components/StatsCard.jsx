export const StatsCard = ({ streak }) => {
  return (
    <div className="flex items-center gap-2 font-ui font-semibold text-secondary">
      <span className="text-lg" role="img" aria-label="fire">
        🔥
      </span>
      <span>{streak}</span>
    </div>
  );
};

export default StatsCard;
