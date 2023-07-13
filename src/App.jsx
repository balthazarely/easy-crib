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
    <div className="card-container pt-3 bg-base-300 flex flex-col  ">
      {players.map((player) => (
        <Player
          key={player.id}
          player={player}
          setScore={setScore}
          score={score}
          isGameOver={isGameOver}
        />
      ))}
      {isGameOver ? "GAME OVER" : ""}
      <ScoreBoard players={players} score={score} setScore={setScore} />
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
    <div className="flex justify-start flex-col items-center    flex-grow w-screen h-1/5">
      <div className="p-1 px-3 w-full flex-grow flex flex-row justify-center items-center ">
        <div className="w-full  gap-4 bg-base-100  shadow-lg rounded-3xl  justify-center items-center   h-full flex ">
          <div className="  w-1/3 flex h-full flex-col justify-center items-center">
            <div className="text-2xl">{player.name}</div>
            <div className="text-6xl font-bold">
              {score.length > 0 && calcScore(score)}
            </div>
          </div>
          <div className=" w-2/3 h-full flex-col flex justify-center items-center gap-2  relative ">
            <div className=" btn-group">
              <button
                disabled={isGameOver}
                onClick={() => handleScoreChange(1)}
                className="btn btn-primary btn-lg h-20 w-24"
              >
                + 1
              </button>
              <button
                disabled={isGameOver}
                className="btn btn-primary btn-lg h-20 w-24"
                onClick={() => handleScoreChange(2)}
              >
                + 2
              </button>
            </div>
          </div>
        </div>
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
    <div className="border-2 h-64 overflow-y-scroll">
      <button
        className=" w-10 bg-green-600 border-none transition-all duration-150 rounded-sm text-white hover:bg-green-800 h-10"
        onClick={undo}
      >
        undo
      </button>
      {score
        .slice(3)
        .slice(0)
        .reverse()
        .map((sc) => {
          return (
            <div className="w-full py-2 text-center">
              {sc.name}: <span className="font-black">+ {sc.score}</span>
            </div>
          );
        })}
    </div>
  );
}

export default App;
