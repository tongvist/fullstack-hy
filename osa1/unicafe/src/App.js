import React, {useState} from "react";

const StatisticsLine = ({name, value, unit}) => <p>{name}: {value}{unit}</p>

const Statistics = ({stats}) => {
  const {good, neutral, bad, all, average, positive} = stats;
  return all > 0 ? (
    <div>
      <StatisticsLine name="Good" value={good} />
      <StatisticsLine name="Neutral" value={neutral} />
      <StatisticsLine name="Bad" value={bad} />
      <StatisticsLine name="All" value={all} />
      <StatisticsLine name="Average" value={average} />
      <StatisticsLine name="Positive" value={positive} unit="%"/>
    </div>
  ) : <p>No Feedback given</p>
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100

  const stats = {
    // Good = 1, neutral = 0, bad = -1
      good: good,
      neutral: neutral,
      bad: bad,
      all: all,
      average: average,
      positive: positive
  }

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

      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      
      <h1>Statistics</h1>

      <Statistics stats={stats} />
    </div>
  );
}

export default App;
