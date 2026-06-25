import { BrowserRouter, Routes, Route } from "react-router";
import { QuizProvider } from "./context/QuizContext.jsx";

import Quiz from "./components/Quiz.jsx";
import Question from "./components/Question.jsx";
import Congratulations from "./components/Congratulations.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <QuizProvider>
          <Routes>
            <Route element={<Quiz />}>
              <Route path="/" element={<Question />} />
              <Route path="result" element={<Congratulations />} />
            </Route>
          </Routes>
        </QuizProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
