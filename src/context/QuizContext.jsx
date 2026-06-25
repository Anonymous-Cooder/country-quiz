import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const QuizContext = createContext();
// it's a custom hook to avoid importing useContext in all components
export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({
    questionsList: [],
    currentQuestion: {},
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    loading: true,
  });

  const {
    questionsList,
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    score,
    loading,
  } = quizState;

  const navigate = useNavigate();

  const getQuizQuestions = async () => {
    try {
      setQuizState((prev) => ({ ...prev, loading: true }));
      const response = await axios.get(
        "https://countries.dev/countries",
      );
      let countries = response.data;
      let sanitizedCountries = sanitizeCountries(countries);
      let shuffledCountries = shuffleArray(sanitizedCountries);

      let selectedCountries = selectCountries(shuffledCountries);
      createQuestion(selectedCountries, sanitizedCountries);
    } catch (error) {
      console.error("Fetch error:", error);
      prompt("Fetch error:", error);
    } finally {
      setTimeout(() => {
        setQuizState((prev) => ({ ...prev, loading: false }));
      }, 500);
    }
  };

  useEffect(() => {
    getQuizQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sanitizeCountries = (countries) => {
    let sanitized = countries.filter((country) => {
      // don't wanna include lengthy name countries for sake of UI
      // countries.dev: name is a string, capital is a string, languages is an array

      if (
        (country?.capital?.length > 0) &
        (country.name.length < 17) &
        (country.name !== "Israel") &
        (country.subregion !== "" && country.subregion != null) &
        (country?.languages?.length > 0)
      ) {
        return true;
      } else {
        return false;
      }
    });
    // console.log("sanitizedCountries", sanitized);
    return sanitized;
  };
  const shuffleArray = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const selectCountries = (countries) => {
    let selected = [];
    for (let i = 0; i < 10; i++) {
      selected.push(countries[i]);
    }
    // console.log("selectedCountries", selected);
    return selected;
  };

  const createQuestion = (countries, allCountries) => {
    // console.log("countries", countries, "allCountries", allCountries);
    let questionTypes = ["Region", "Sub Region", "Capital", "Flag", "Language"];
    let newQuestions = [];
    for (let country of countries) {
      let selectedQuestionType =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];
      // console.log(selectedQuestionType);

      switch (selectedQuestionType) {
        case "Region": {
          const question = `Which of these countries is in ${country.region}?`;
          const correctAnswer = country.name;
          const type = "Region";
          let options = [correctAnswer];
          while (options.length < 4) {
            let random = Math.floor(Math.random() * allCountries.length);
            let randomCountry = allCountries[random];
            let option = randomCountry.name;
            if (
              (randomCountry.region !== country.region) &
              !options.includes(option)
            ) {
              options.push(option);
            }
          }
          options = shuffleArray(options);

          const questionSet = { question, correctAnswer, options, type };
          newQuestions.push(questionSet);
          // console.log("Region Question", questionSet);
          break;
        }
        case "Capital": {
          const question = `Which city is the capital of ${country.name}?`;
          const correctAnswer = country.capital;
          const type = "Capital";

          let options = [correctAnswer];
          while (options.length < 4) {
            let random = Math.floor(Math.random() * allCountries.length);
            let randomCountry = allCountries[random];
            let option = randomCountry.capital;
            if (!options.includes(option)) {
              options.push(option);
            }
          }
          options = shuffleArray(options);

          const questionSet = { question, correctAnswer, options, type };
          newQuestions.push(questionSet);
          // console.log("Capital Question", questionSet);
          break;
        }
        case "Flag": {
          let question = `Which country does this flag {{flag}} belong to?`;
          let correctAnswer = country.name;
          let flagUrl = country.flags.png;
          const type = "Flag";

          let options = [correctAnswer];
          while (options.length < 4) {
            let random = Math.floor(Math.random() * allCountries.length);
            let randomCountry = allCountries[random];
            let option = randomCountry.name;
            if (!options.includes(option)) {
              options.push(option);
            }
          }
          options = shuffleArray(options);

          const questionSet = {
            question,
            correctAnswer,
            options,
            type,
            flagUrl,
          };
          newQuestions.push(questionSet);
          // console.log("Flag Question", questionSet);
          break;
        }

        case "Sub Region": {
          let question = `${country.name} is located in which subregion?`;
          let correctAnswer = country.subregion;
          const type = "Sub Region";

          let options = [correctAnswer];
          while (options.length < 4) {
            let random = Math.floor(Math.random() * allCountries.length);
            let randomCountry = allCountries[random];
            let option = randomCountry.subregion;
            if (!options.includes(option)) {
              options.push(option);
            }
          }
          options = shuffleArray(options);

          const questionSet = { question, correctAnswer, options, type };
          newQuestions.push(questionSet);
          // console.log("Sub Region Question", questionSet);
          break;
        }
        case "Language": {
          let question = `What language is primarily spoken in ${country.name}?`;
          let correctAnswer = country.languages[0].name;
          const type = "Language";

          let options = [correctAnswer];
          while (options.length < 4) {
            let random = Math.floor(Math.random() * allCountries.length);
            let randomCountry = allCountries[random];
            let option = randomCountry.languages[0].name;
            if (!options.includes(option)) {
              options.push(option);
            }
          }
          options = shuffleArray(options);
          const questionSet = { question, correctAnswer, options, type };
          newQuestions.push(questionSet);
          // console.log("Language Question", questionSet);
          break;
        }
      }
    }
    // console.log(newQuestions);
    setQuizState((prev) => ({
      ...prev,
      questionsList: newQuestions,
      currentQuestion: newQuestions[0],
    }));
  };
  // console.log(currentQuestion);

  const handleNextQuestion = () => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: prev.questionsList[prev.currentQuestionIndex + 1],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  const handlePrevQuestion = () => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: prev.questionsList[prev.currentQuestionIndex - 1],
      currentQuestionIndex: prev.currentQuestionIndex - 1,
    }));
  };

  const handleQuestionSelect = (index) => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: prev.questionsList[index],
      currentQuestionIndex: index,
    }));
  };

  const handleAnswer = (questionIndex, selectedOption) => {
    if (userAnswers[questionIndex]) {
      return;
    }
    const correctAnswer = questionsList[questionIndex].correctAnswer;
    const isCorrect = selectedOption === correctAnswer;

    setQuizState((prev) => {
      const updated = [...prev.userAnswers];
      updated[questionIndex] = { selectedOption, isCorrect };

      const answeredCount = updated.filter(Boolean).length;
      if (answeredCount === 10) {
        setTimeout(() => {
          navigate("/result");
        }, 1000);
      }

      return {
        ...prev,
        userAnswers: updated,
        score: isCorrect ? prev.score + 1 : prev.score,
      };
    });
  };

  const handleFinishQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
    }));
    getQuizQuestions();
    navigate("/");
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        score,
        questionsList,
        currentQuestionIndex,
        userAnswers,

        loading,
        getQuizQuestions,
        handleNextQuestion,
        handlePrevQuestion,
        handleQuestionSelect,
        handleAnswer,
        handleFinishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
