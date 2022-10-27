import { useState } from "react";

const Display = (props) => {
  return (
    <h2>
      {props.text}
    </h2>
  );
};

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
};

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};

const Stats = ({good, neutral, bad}) => {

  const all = () => {
    return good + neutral + bad;
  };

  const average = () => {
    return (good * 1 + bad * -1) / all();
  };

  const positive = () => {
    return good / all();
  };

  if (!all()) {
    return (
      <div>
        No feedbacks given
      </div>
    );
  } else {
    return (
      <div>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all()}/>
        <StatisticLine text='average' value={average()}/>
        <StatisticLine text='positive' value={positive()}/>
      </div>

    );
  }

};

function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  


  return (
    <div>
      <Display text='give feedback'/>
      <Button onClick={() => {setGood(good + 1)}} text='good' />
      <Button onClick={() => {setNeutral(neutral + 1)}} text='neutral' />
      <Button onClick={() => {setBad(bad + 1)}} text='bad' />

      <Display text='statistics'/>
      <Stats good={good} neutral={neutral} bad={bad}/>

    </div>
  );
}

export default App;
