import congrats from "../assets/congrats.png";
import { useQuiz } from "../context/QuizContext.jsx";
const Congratulations = () => {
  const { score, handleFinishQuiz } = useQuiz();
  return (
    <>
      <div className="w-full rounded-xl bg-[#393F6E] px-6 py-6 shadow-[0_10px_20px_rgba(0,0,0,0.25)] xs:px-10 xs:py-10 sm:px-11 sm:py-11 md:px-12 md:py-12 lg:px-16 lg:py-16">
        <div className="mt-8 flex flex-col items-center gap-8">
          <img
            src={congrats}
            alt="congratulations.png"
            className="w-48 xs:w-56 md:w-64 lg:w-80"
          />
          <h1 className="mx-auto text-center text-lg font-semibold text-[#E2E4F3] xs:text-2xl md:text-3xl lg:text-4xl">
            Congrats! You completed the quiz.
          </h1>
          <p className="text-[#E2E4F3] md:text-lg lg:text-xl">
            You answered {score}/10 correctly
          </p>
          <button
            onClick={() => {
              handleFinishQuiz();
            }}
            className="staggered-transition active-btn flex h-12 w-full max-w-70 cursor-pointer items-center justify-center rounded-xl bg-linear-to-r from-[#E65895] to-[#BC6BE8] text-[14px] text-[#E2E4F3] hover:scale-110 xs:max-w-80 md:h-16 md:max-w-96 md:text-lg lg:h-20 lg:text-xl"
          >
            Play again
          </button>
        </div>
      </div>
    </>
  );
};
export default Congratulations;
