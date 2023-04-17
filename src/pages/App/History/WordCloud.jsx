import React, { useCallback } from 'react';
import WordCloud from 'react-d3-cloud';

export default function WordCloudComponent({ data }) {
  const fontSize = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate = useCallback((word) => word.value % 90, []);
  const generateColor = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = "#";
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
  
    return color;
  };
  const fill = useCallback((d, i) => {
    const color = generateColor(d.text);
    console.log(`Word: ${d.text}, Index: ${i}, Color: ${color}`);
    return color;
  }, []);
  

  return (
    <WordCloud
      data={data}
      width={500}
      height={500}
      font="Arial"
      fontStyle="normal"
      fontWeight="normal"
      fontSize={fontSize}
      spiral="rectangular"
      rotate={rotate}
      padding={5}
      random={Math.random}
      fill={fill}
     />
  );
}
