import React from "react";

export default function PreferencesModal({
  setPreferencesModalOpen,
  preferencesModalOpen,
  handleToggleThirdPlayer,
  thirdPlayer,
}) {
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
        checked={preferencesModalOpen}
        readOnly
      />
      <div className="modal">
        <div className="modal-box">
          <button
            onClick={() => setPreferencesModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-center text-lg">Preferences</h3>

          <div className="modal-action flex justify-center">
            <button
              onClick={() => handleToggleThirdPlayer(false)}
              className="btn bg-primary"
            >
              2 Players
            </button>
            <button
              onClick={() => handleToggleThirdPlayer(true)}
              className="btn bg-primary"
            >
              3 Players
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
