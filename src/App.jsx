import React, { useEffect, useState } from "react";
import "./App.css";
import { HiCog6Tooth } from "react-icons/hi2";
import Player from "./components/Player";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [players, setPlayers] = useState([
    { id: 0, name: "player 1" },
    { id: 1, name: "player 2" },
    { id: 2, name: "player 3" },
  ]);

  const [score, setScore] = useState([
    { id: 0, score: null },
    { id: 1, score: null },
    { id: 2, score: null },
  ]);

  const [showPegging, setShowPegging] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [thirdPlayer, setThirdPlayer] = useState(false);
  const [newGameGameSetupModalOpen, setNewGameGameSetupModalOpen] =
    useState(false);

  useEffect(() => {
    const score = localStorage.getItem("easycrib-score");
    const storedPlayers = localStorage.getItem("easycrib-players");
    const numPlayers = localStorage.getItem("easycrib-num-players");

    if (score) {
      setScore(JSON.parse(score));
    }
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
    if (numPlayers) {
      setThirdPlayer(JSON.parse(numPlayers));
    }
  }, []);

  const checkGameStatus = () => {
    score.forEach((player) => {
      const playerId = player.id;
      const playerScoreTotal = score.reduce((total, item) => {
        if (item.id === playerId) {
          return total + item.score;
        }
        return total;
      }, 0);
      if (playerScoreTotal > 119) {
        setIsGameOver(true);
        console.log("GAME OVER");
        return;
      }
    });
  };

  const resetGame = () => {
    const resetScore = [
      { id: 0, score: null },
      { id: 1, score: null },
      { id: 2, score: null },
    ];
    setScore(resetScore);
    setNewGameGameSetupModalOpen(false);
    localStorage.setItem("easycrib-score", JSON.stringify(resetScore));
  };

  const changePlayerName = (name, id) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) => {
        if (player.id === id) {
          return { ...player, name };
        }
        return player;
      });
      localStorage.setItem("easycrib-players", JSON.stringify(updatedPlayers));
      return updatedPlayers;
    });
  };

  const handleToggleThirdPlayer = (state) => {
    setThirdPlayer(state);
    localStorage.setItem("easycrib-num-players", JSON.stringify(state));
  };

  useEffect(() => {
    checkGameStatus();
  }, [score]);

  const filteredPlayers = thirdPlayer ? players : players.slice(0, 2);

  return (
    <div className="card-container pt-3 bg-base-300 flex flex-col">
      {filteredPlayers.map((player) => (
        <Player
          key={player.id}
          player={player}
          setScore={setScore}
          score={score}
          isGameOver={isGameOver}
          showPegging={showPegging}
          setShowPegging={setShowPegging}
          changePlayerName={changePlayerName}
        />
      ))}
      <ScoreBoard
        setNewGameGameSetupModalOpen={setNewGameGameSetupModalOpen}
        players={players}
        score={score}
        setScore={setScore}
        showPegging={showPegging}
        setShowPegging={setShowPegging}
        handleToggleThirdPlayer={handleToggleThirdPlayer}
        thirdPlayer={thirdPlayer}
      />
      <NewGameModal
        newGameGameSetupModalOpen={newGameGameSetupModalOpen}
        setNewGameGameSetupModalOpen={setNewGameGameSetupModalOpen}
        resetGame={resetGame}
      />
    </div>
  );
}

function NewGameModal({
  newGameGameSetupModalOpen,
  setNewGameGameSetupModalOpen,
  resetGame,
}) {
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
        checked={newGameGameSetupModalOpen}
        readOnly
      />
      <div className="modal">
        <div className="modal-box">
          <button
            onClick={() => setNewGameGameSetupModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-center text-lg mt-5">
            Are you sure you want to start a new game?
          </h3>

          <div className="w-full flex justify-center">
            <button onClick={resetGame} className="btn bg-primary btn-lg mt-4">
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
