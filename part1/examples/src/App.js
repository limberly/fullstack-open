import { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        This app is used by clicking buttons
      </div>
    )
  }

  return (
    <div>
      Button press history: {props.allClicks.join( ' ')}
    </div>
  )
};

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  };

  return (
    <div>
      <Display counter={left} />
      <Button onClick={handleLeftClick} text='left' />

      <Display counter={right} />
      <Button onClick={handleRightClick} text='right' />

      <History allClicks={allClicks}/>
    </div>

  )
};

export default App;
