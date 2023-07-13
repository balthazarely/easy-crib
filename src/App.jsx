import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([
    { id: 0, name: "sue", score: 0 },
    { id: 1, name: "balthazar", score: 0 },
    { id: 2, name: "annie", score: 0 },
  ]);
  const [score, setScore] = useState(players);
  const [isGameOver, setIsGameOver] = useState(false);

  const checkGameStatus = () => {
    players.forEach((player) => {
      const playerId = player.id;
      const playerScoreTotal = score.reduce((total, item) => {
        if (item.id === playerId) {
          return total + item.score;
        }
        return total;
      }, 0);
      if (playerScoreTotal > 119) {
        setIsGameOver(true);
        return;
      }
    });
  };

  useEffect(() => {
    checkGameStatus();
  }, [score]);

  return (
    <div className="card-container  ">
      {isGameOver ? "GAME OVER" : ""}
      {players.map((player) => (
        <Player
          key={player.id}
          player={player}
          setScore={setScore}
          score={score}
          isGameOver={isGameOver}
        />
      ))}

      {/* <ScoreBoard players={players} score={score} setScore={setScore} /> */}
    </div>
  );
}

function Player({ player, setScore, score, isGameOver }) {
  const numbers = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ];

  const handleScoreChange = (num) => {
    const scoreObj = { ...player, score: num };
    setScore([...score, scoreObj]);
  };

  const calcScore = (score) => {
    return score
      .filter((item) => item.id === player.id)
      .reduce((accumulator, current) => accumulator + current.score, 0);
  };

  return (
    <div className="flex justify-start flex-col items-center bg-base-300  flex-grow w-screen h-1/3">
      <div className="p-3 w-full flex-grow flex flex-row justify-center items-center ">
        <div className="w-full py-2 gap-4 bg-base-100  shadow-lg rounded-3xl  justify-center items-center   h-full flex ">
          <div className="  w-1/3 flex h-full flex-col justify-center items-center">
            <div className="text-2xl">{player.name}</div>
            <div className="text-6xl font-bold">
              {score.length > 0 && calcScore(score)}
            </div>
          </div>
          <div className="btn-group  w-2/3 h-full  flex justify-center items-center gap-2">
            <button
              disabled={isGameOver}
              onClick={() => handleScoreChange(1)}
              className="btn btn-primary btn-lg h-20 w-24"
            >
              + 1
            </button>
            <button
              className="btn btn-primary btn-lg h-20 w-24"
              onClick={() => handleScoreChange(2)}
            >
              + 2
            </button>
          </div>
        </div>
        {/* <button
            disabled={isGameOver}
            onClick={() => handleScoreChange(1)}
            className="btn btn-primary w-full"
          >
            + 1
          </button>
          <button
            disabled={isGameOver}
            onClick={() => handleScoreChange(2)}
            className="btn btn-primary "
            // className=" w-full h-1/2  rounded-br-3xl bg-green-600 border-none transition-all duration-150 rounded-sm  text-neutral-200 hover:bg-green-800 text-2xl font-bold"
          >
            + 2
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
}

function ScoreBoard({ players, score, setScore }) {
  const undo = () => {
    if (score.length > players.length) {
      setScore((prevScore) => {
        const updatedScore = [...prevScore];
        updatedScore.pop();
        return updatedScore;
      });
    }
  };

  return (
    <div>
      <button
        className=" w-10 bg-green-600 border-none transition-all duration-150 rounded-sm text-white hover:bg-green-800 h-10"
        onClick={undo}
      >
        undo
      </button>
      {score.map((sc) => {
        return (
          <div>
            {sc.name}: {sc.score}
          </div>
        );
      })}
    </div>
  );
}

export default App;
