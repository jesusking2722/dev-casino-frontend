import ScrollAnimation from "react-animate-on-scroll";
import { Alert, Stepper } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Payment = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isVerified =
    ((user?.email && user?.email_verified === "yes") ||
      (user?.phone && user?.phone_verified === "yes")) &&
    user?.document_verified === "yes";

  return (
    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeInLeft">
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        {!isVerified ? (
          <>
            <Alert
              type="error"
              label="Sorry, you are not verified. It's easy to do!"
            />
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="font-semibold text-sm text-white/50 font-sans">
                Withdrawing funds is done in two steps:
              </p>
              <Stepper
                steps={[
                  "Document verification",
                  "Verification by Email or Phone number",
                ]}
                current={1}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </ScrollAnimation>
  );
};

export default Payment;
