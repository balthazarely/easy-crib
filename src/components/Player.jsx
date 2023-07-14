import React from "react";
import { useState } from "react";
import { HiCog } from "react-icons/hi";

export default function Player({
  player,
  setScore,
  score,
  isGameOver,
  showPegging,
  changePlayerName,
}) {
  const [typedScore, setTypedScore] = useState(0);
  const [userNameEdit, setUserNameEdit] = useState(false);
  const [newUserName, setNewUserName] = useState(player.name);

  const handleTypedScoreChange = (num) => {
    const newNumber = num !== null ? num : Number(typedScore);
    const scoreObj = { ...player, score: newNumber };
    const newScore = [...score, scoreObj];
    setScore(newScore);
    localStorage.setItem("easycrib-score", JSON.stringify(newScore));
  };

  const handleUserNameEdit = () => {
    setUserNameEdit(false);
    changePlayerName(newUserName, player.id);
  };

  const calcScore = (score) => {
    const scoreReduced = score
      .filter((item) => item.id === player.id)
      .reduce((accumulator, current) => accumulator + current.score, 0);
    return scoreReduced;
  };

  return (
    <div
      className={` flex justify-start flex-col items-center h-32 flex-grow w-screen relative `}
    >
      <button
        onClick={() => setUserNameEdit(!userNameEdit)}
        className="absolute btn btn-sm bottom-3 left-3"
      >
        <HiCog />
      </button>
      <div className="p-1 px-3 w-full flex-grow flex flex-row justify-center items-center ">
        {userNameEdit ? (
          <div className="flex join">
            <input
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="input input-bordered input-lg input-primary w-full join-item max-w-xs"
            />
            <button
              onClick={handleUserNameEdit}
              className="btn btn-primary btn-lg join-item"
            >
              submit
            </button>
          </div>
        ) : (
          <div className="w-full  gap-4 bg-base-100  shadow-lg rounded-3xl  justify-center items-center   h-full flex ">
            <div className="  w-1/3 flex h-full flex-col justify-center items-center">
              <div className="text-2xl">{player.name}</div>
              <div className="text-6xl font-bold">{calcScore(score)}</div>
            </div>
            <div className=" w-2/3 h-full flex-col flex flex-wrap justify-center items-center gap-2  relative ">
              {showPegging ? (
                <div className=" btn-group">
                  <button
                    disabled={isGameOver}
                    onClick={() => handleTypedScoreChange(1)}
                    className="btn btn-primary btn-lg h-20 w-24"
                  >
                    + 1
                  </button>
                  <button
                    disabled={isGameOver}
                    className="btn btn-primary btn-lg h-20 w-24"
                    onClick={() => handleTypedScoreChange(2)}
                  >
                    + 2
                  </button>
                </div>
              ) : (
                <div className="pr-4">
                  <div className="form-control">
                    <div className="input-group join">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Search…"
                        onChange={(e) => setTypedScore(e.target.value)}
                        className="input  join-item input-primary input-lg input-bordered input-group-lg w-32"
                      />
                      <button
                        onClick={() => handleTypedScoreChange(null)}
                        className="btn join-item btn-lg btn-primary "
                      >
                        Enter
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
