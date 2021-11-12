import React, {useState} from "react";

const Statistics = ({name, value, unit}) => <p>{name}: {value}{unit}</p>

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Good = 1, neutral = 0, bad = -1
  const all = good + neutral + bad; 
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  const handleGood = () => {
    setGood(good + 1);
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }
  const handleBad = () => {
    setBad(bad + 1);
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>

      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      
      <h1>Statistics</h1>

      <Statistics name="Good" value={good} />
      <Statistics name="Neutral" value={neutral} />
      <Statistics name="Bad" value={bad} />
      <Statistics name="All" value={all} />
      <Statistics name="Average" value={average} />
      <Statistics name="Positive" value={positive} unit="%"/>
    </div>
  );
}

export default App;
