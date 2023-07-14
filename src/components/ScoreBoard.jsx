import React from "react";
import { useState } from "react";
import PreferencesModal from "./PreferencesModal";
import { HiCog } from "react-icons/hi";

export default function ScoreBoard({
  setNewGameGameSetupModalOpen,
  players,
  score,
  setScore,
  setShowPegging,
  showPegging,
  handleToggleThirdPlayer,
  thirdPlayer,
}) {
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);

  const scoreWithName = score.map((score) => {
    const name = players.find((play) => play.id === score.id);
    return {
      ...score,
      name: name.name,
    };
  });

  const undo = () => {
    setScore((prevScore) => {
      const updatedScore = [...prevScore];
      updatedScore.pop();
      return updatedScore;
    });
  };

  // const removeMove = (idx) => {
  //   const reversedScore = score.slice(3).reverse();
  //   const updatedScore = [...score];
  //   const originalIdx = reversedScore.length - 1 - idx;
  //   updatedScore.splice(originalIdx + 3, 1);
  //   setScore(updatedScore);
  // };

  return (
    <div className=" p-2 flex flex-col  h-64 overflow-y-scroll">
      <div className="w-full flex justify-between">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setPreferencesModalOpen(true)}
        >
          <HiCog />
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setNewGameGameSetupModalOpen(true)}
        >
          New Game
        </button>
        <button
          disabled={scoreWithName.length <= 3}
          className="btn btn-sm btn-outline"
          onClick={undo}
        >
          Undo
        </button>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setShowPegging(!showPegging)}
        >
          Switch View
        </button>
      </div>
      <div className="flex-grow mt-2 bg-base-200  overflow-y-scroll">
        {scoreWithName
          .slice(3)
          .slice(0)
          .reverse()
          .map((sc, idx) => {
            return (
              <div
                // onClick={() => removeMove(idx)}
                key={idx}
                className="w-full py-2 text-center"
              >
                {sc.name}: <span className="font-black">+ {sc.score} </span>
              </div>
            );
          })}
      </div>
      <PreferencesModal
        setPreferencesModalOpen={setPreferencesModalOpen}
        preferencesModalOpen={preferencesModalOpen}
        handleToggleThirdPlayer={handleToggleThirdPlayer}
        thirdPlayer={thirdPlayer}
      />
    </div>
  );
}
