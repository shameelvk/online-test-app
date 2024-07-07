import { createContext, useContext, useState, useEffect } from "react";
import sampleData from '../assets/data/sampleData.json';

const DataContext = createContext([]);

const DataProvider = ({ children }) => {
  const [category, setCategory] = useState("sports");
  const [score, setScore] = useState(0);
  const [questionsData, setQuestionsData] = useState(["aaa"]);
  const [wrongScore, setWrongScore] = useState(0);
  const [skippedScore, setSkippedScore] = useState(0);

  useEffect(() => {
    console.log("hiiii");
    setQuestionsData(sampleData.filter((question) => question.category === category));
  }, [category]);

  return (
    <DataContext.Provider
      value={{
        category,
        setCategory,
        score,
        setScore,
        questionsData,
        setQuestionsData,
        wrongScore,
        setWrongScore,
        skippedScore,
        setSkippedScore,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };