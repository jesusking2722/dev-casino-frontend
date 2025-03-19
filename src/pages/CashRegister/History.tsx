import ScrollAnimation from "react-animate-on-scroll";

const History = () => {
  return (
    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeInLeft">
      <div className="flex flex-col items-center justify-center gap-8 py-8">
        <img
          src="../assets/icons/dollar.png"
          alt="DOLLAR"
          className="w-[100px] h-auto"
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="text-white font-semibold text-lg">No records found</h3>
          <p className="text-white/50 text-base">
            Make your first deposit and they will appear in history
          </p>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default History;
