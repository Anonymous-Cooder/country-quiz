import cross from "../assets/cross.svg";
import check from "../assets/check.svg";
import trophyImg from "../assets/Trophy.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { CircularProgress } from "@mui/material";
import { useQuiz } from "../context/QuizContext.jsx";

const Question = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    questionsList,
    score,
    loading,
    handleNextQuestion,
    handlePrevQuestion,
    handleQuestionSelect,
    handleAnswer,
  } = useQuiz();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#E2E4F3] xs:text-2xl sm:text-[28px] md:text-3xl lg:text-4xl">
          Country Quiz
        </h1>

        <div className="flex items-center gap-1 rounded-full bg-linear-to-r from-[#E65895] to-[#BC6BE8] px-3 py-1 text-[12px] font-semibold text-[#E2E4F3] xs:px-4 xs:py-2 xs:text-[14px] sm:px-4.5 sm:text-[15px] md:px-5 md:py-2 md:text-[16px] lg:px-6 lg:py-3 lg:text-[18px]">
          <img
            src={trophyImg}
            alt="Trophy.png"
            className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 lg:h-6 lg:w-6"
          />{" "}
          {score}/10 Points
        </div>
      </div>
      <div className="w-full rounded-xl bg-[#393F6E] px-6 py-6 shadow-[0_10px_20px_rgba(0,0,0,0.25)] xs:px-10 xs:py-10 sm:px-11 sm:py-11 md:px-12 md:py-12 lg:px-16 lg:py-16">
        <div className="mb-5 flex flex-wrap justify-center gap-3">
          {!loading &&
            questionsList.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionSelect(index)}
                className={`staggered-transition flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#343964] text-[12px] text-[#E2E4F3] hover:scale-110 xs:h-10 xs:w-10 xs:text-sm sm:h-11 sm:w-11 md:h-12 md:w-12 md:text-base lg:text-lg ${
                  index === currentQuestionIndex
                    ? "active-btn font-semibold"
                    : "font-medium"
                }`}
              >
                {index + 1}
              </button>
            ))}
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <CircularProgress
              size={56}
              thickness={4}
              sx={{ color: "#E65895" }}
            />
          </div>
        ) : (
          <>
            {/* Question */}
            <p className="mb-6 text-center text-[16px] font-semibold text-[#E2E4F3] xs:mb-8 xs:text-[20px] sm:mb-9 sm:text-[22px] md:mb-10 md:text-2xl lg:mb-12 lg:text-3xl xl:text-4xl">
              {currentQuestion.flagUrl
                ? currentQuestion.question.split("{{flag}}").map((part, i) => (
                    <span key={i}>
                      {part}
                      {i === 0 && (
                        <img
                          src={currentQuestion.flagUrl}
                          alt="flag"
                          className="mx-2 inline w-5 xs:w-6 sm:w-7 md:w-8 lg:w-9"
                        />
                      )}
                    </span>
                  ))
                : currentQuestion.question}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4 xs:gap-5 sm:gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(currentQuestionIndex, option)}
                  disabled={!!userAnswers[currentQuestionIndex]}
                  className={`staggered-transition flex h-12 items-center justify-center rounded-xl bg-[#343964] px-4 py-3 text-[14px] font-medium text-[#E2E4F3] xs:h-14 xs:text-base sm:h-15 sm:text-[17px] md:min-h-16 md:px-6 md:text-lg lg:min-h-20 lg:text-xl ${
                    userAnswers[currentQuestionIndex]
                      ? "cursor-default"
                      : "cursor-pointer hover:scale-110"
                  }`}
                >
                  {option}{" "}
                  {userAnswers[currentQuestionIndex] &&
                    (userAnswers[currentQuestionIndex].selectedOption ===
                      option ||
                      questionsList[currentQuestionIndex].correctAnswer ===
                        option) && (
                      <img
                        src={
                          questionsList[currentQuestionIndex].correctAnswer ===
                          option
                            ? check
                            : cross
                        }
                        alt={
                          questionsList[currentQuestionIndex].correctAnswer ===
                          option
                            ? "check.svg"
                            : "cross.svg"
                        }
                        className="ms-1 w-4 sm:w-4.5 md:ms-2 md:w-5 lg:w-6"
                      />
                    )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Prev / Next buttons */}
        <div className="mt-6 flex items-center justify-between xs:mt-8 sm:mt-9 md:mt-10 lg:mt-12">
          <button
            onClick={() => handlePrevQuestion()}
            className={`staggered-transition flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#343964] px-5 py-2 text-[13px] font-semibold text-[#E2E4F3] hover:scale-105 xs:h-11 xs:px-6 xs:text-sm sm:h-12 sm:px-7 sm:text-[15px] md:h-13 md:px-8 md:text-base lg:h-14 lg:px-10 lg:text-lg ${currentQuestionIndex === 0 ? "pointer-events-none opacity-0" : ""}`}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-sm xs:text-base md:text-lg"
            />
            Prev
          </button>

          <button
            onClick={() => handleNextQuestion()}
            className={`staggered-transition flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#343964] px-5 py-2 text-[13px] font-semibold text-[#E2E4F3] hover:scale-105 xs:h-11 xs:px-6 xs:text-sm sm:h-12 sm:px-7 sm:text-[15px] md:h-13 md:px-8 md:text-base lg:h-14 lg:px-10 lg:text-lg ${currentQuestionIndex === 9 ? "pointer-events-none opacity-0" : ""}`}
          >
            Next
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-sm xs:text-base md:text-lg"
            />
          </button>
        </div>
      </div>
    </>
  );
};
export default Question;
