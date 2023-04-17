import React, { useState, useEffect } from "react";
import HistoryBar from "./HistoryBar";
import WordCloudComponent from "./WordCloud";
import axios from "axios";

export default function History() {
  const [showHistory, setShowHistory] = useState([]);
  const token = localStorage.getItem("token");
  console.log( `token in History: ${token}`);

  useEffect(() => {
    const showAllHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/showhistory", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setShowHistory(response.data.search_history);
      } catch (error) {
        console.log(error);
      }
    };
    if (showHistory) {
      showAllHistory();
    }
  }, []);

const data = showHistory.reduce((acc, word) => {
    const findWordCount = acc.findIndex((e) => e.text === word);
    if (findWordCount !== -1) {
      acc[findWordCount].value += 10;
    } else {
      acc.push({ text: word, value: 10 });
    }
    return acc;
  }, []);
console.log(JSON.stringify(data, null, 2));
  return (
    <>
      <HistoryBar />
       <WordCloudComponent data={data} />
    </>
  );
}
