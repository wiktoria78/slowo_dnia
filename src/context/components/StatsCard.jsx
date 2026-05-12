export const StatsCard = ({ streak }) => {
  return (
    <div className="flex items-center gap-1 md:gap-2 font-ui font-semibold text-secondary text-xs md:text-sm">
       <span className="text-xs md:text-lg cursor-default" role="img" aria-label="fire" title="Streak">
         🔥
       </span>
       <span>{streak}</span>
     </div>
   );
};

export default StatsCard;
