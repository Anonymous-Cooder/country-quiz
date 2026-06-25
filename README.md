# 🌍 Country Quiz

A dynamic, interactive web-based quiz application that tests your knowledge about countries around the world! Built with React, Vite, and Tailwind CSS, this app generates unique quiz sessions in real-time using data from the countries.dev API.

## 📸 Screenshots

*(Add your screenshots or GIFs here showing the quiz interface, different question types, and the results screen)*

## ✨ Features

- **Dynamic Questions:** Randomly generates a set of 10 questions for every new quiz session.
- **Multiple Question Types:** Tests various attributes of countries:
  - 🏛️ **Capitals:** "Which city is the capital of X?"
  - 🗺️ **Regions:** "Which of these countries is in X region?"
  - 📍 **Subregions:** "X is located in which subregion?"
  - 🗣️ **Languages:** "What language is primarily spoken in X?"
  - 🎌 **Flags:** "Which country does this flag belong to?"
- **Interactive Gameplay:** Instant feedback on selected answers and seamless navigation between questions.
- **Score Tracking:** Keeps a running tally of correct answers and displays a final score at the end of the quiz.
- **Data Sanitization:** Automatically filters out edge cases (e.g., countries with missing capitals or overly long names) to ensure a clean user interface.
- **Responsive UI:** A beautiful, responsive design powered by Tailwind CSS and Material UI.

## 🛠️ Technical Stack

- **Frontend Framework:** [React 19](https://react.dev/) (Bootstrapped with [Vite](https://vitejs.dev/))
- **State Management:** React Context API (Custom `QuizProvider` and `useQuiz` hook)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [Material UI (MUI)](https://mui.com/), and [Emotion](https://emotion.sh/)
- **Icons & Typography:** [FontAwesome](https://fontawesome.com/), [FontSource (Be Vietnam Pro)](https://fontsource.org/fonts/be-vietnam-pro)
- **Data Fetching:** [Axios](https://axios-http.com/)

## 🔗 API Integration

This project relies on the [countries.dev API](https://countries.dev/). 
Specifically, it fetches from the `/countries` endpoint, which returns all country data including name, capital, region, subregion, flags, and languages. The raw data is then shuffled and formatted into 5 distinct multiple-choice question formats.

## 🚀 Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/country-quiz.git
   cd country-quiz
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open `http://localhost:5173` (or the port provided by Vite) in your web browser.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
