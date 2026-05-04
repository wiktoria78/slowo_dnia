export const StatsCard = ({ streak }) => {
  return (
    <div className="flex items-center gap-2 font-ui font-semibold text-secondary">
       <span className="text-lg cursor-default" role="img" aria-label="fire" title="Streak">
         🔥
       </span>
      <span>{streak}</span>
    </div>
  );
};

export default StatsCard;
