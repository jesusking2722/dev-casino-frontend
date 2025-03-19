import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router";

const styles = {
  button:
    "w-32 h-32 p-4 flex flex-row items-center justify-center transition-all duration-300 ease-in-out rounded-xl hover:bg-[#071d12] hover:backdrop-blur-sm focus:bg-[#071d12] focus:backdrop-blur-sm border border-[#1F1F21]",
};

const Replenishment = () => {
  return (
    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeInLeft">
      <div className="flex flex-row items-center justify-center gap-4">
        <Link to="/cash-register/visa" className={styles.button}>
          <img
            src="../assets/logos/visamc.svg"
            alt="VISA"
            className="w-20 h-auto"
          />
        </Link>
        <Link to="/cash-register/googlepay" className={styles.button}>
          <img
            src="../assets/logos/googlepay.svg"
            alt="VISA"
            className="w-20 h-auto"
          />
        </Link>
        <Link to="/cash-reigster/visa" className={styles.button}>
          <img
            src="../assets/logos/city-24.svg"
            alt="VISA"
            className="w-20 h-auto"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center mt-4">
        <Link to="/cash-reigster/visa" className={styles.button}>
          <img
            src="../assets/logos/easypay.svg"
            alt="VISA"
            className="w-20 h-auto"
          />
        </Link>
      </div>
    </ScrollAnimation>
  );
};

export default Replenishment;
