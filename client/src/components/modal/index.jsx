import React from "react";

const HistoryModal = ({ history, toggleModal }) => {
  return (
    <div className="modal bg-black bg-opacity-40 fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="modal-content overflow-scroll bg-white rounded-lg p-4 max-w-md">
        <span
          onClick={toggleModal}
          data-testid="close-button"
          className="close text-white text-3xl font-bold cursor-pointer absolute top-0 right-0 p-2"
        >
          Close &times;
        </span>
        <h2 className="text-2xl font-bold underline m-8">
          Calculation History
        </h2>
        <ul className="">
          {history.map(({ parameters, result }, index) => {
            const params = parameters.join("");
            return (
              <li
                key={index}
                className="p-2 mb-2 cursor-pointer hover:bg-gray-100 rounded transition duration-300"
              >
                {params} = {result}
                <span>
                  <hr />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HistoryModal;
