import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [comments, setComment] = useState([]);

  const handleComment = (type) => {
    switch (type) {
      case "good":
        setGood(good + 1);
        setComment((comments) => [...comments, 1]);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        setComment((comments) => [...comments, 0]);
        break;

      case "bad":
        setBad(bad + 1);
        setComment((comments) => [...comments, -1]);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" action={() => handleComment("good")} />
      <Button text="neutral" action={() => handleComment("neutral")} />
      <Button text="bad" action={() => handleComment("bad")} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} comments={comments} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad, comments }) => {
  const calculateAvg = (array) => {
    let sum = 0;

    array.forEach((element) => {
      sum += element;
    });

    return sum / array.length;
  };

  const calculatePositives = (array) => {
    let sum = 0;

    array.forEach((element) => {
      if (element === 1) sum += 100;
    });

    return sum / array.length;
  };

  if (comments.length > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="average" value={calculateAvg(comments)} />
          <Statistic text="positive" value={calculatePositives(comments)} />
        </tbody>
      </table>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};

const Button = ({ text, action }) => {
  return <button onClick={action}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
