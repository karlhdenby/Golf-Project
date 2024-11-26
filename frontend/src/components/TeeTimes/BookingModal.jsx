import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import './BookingModal.css'
import { useParams } from "react-router-dom";

export const BookingModal = (info) => {
  const {time, month, day} = info
  const [players, setPlayers] = useState(1);
  const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  const prompt = (
    <div className="moreBox">
      <div className="first-name">
        <h3>First Name</h3>
        <textarea placeholder="John"></textarea>
      </div>
      <div className="last-name">
        <h3>Last Name</h3>
        <textarea placeholder="Doe"></textarea>
      </div>
      <div className="players">
        <h3>Select Players</h3>
        <div className="players-buttons">
          <button className={players === 1 ? "active" : "inactive"} onClick={() => setPlayers(1)} type="button">1</button>
          <button className={players === 2 ? "active" : "inactive"} onClick={() => setPlayers(2)} type="button">2</button>
          <button className={players === 3 ? "active" : "inactive"} onClick={() => setPlayers(3)} type="button">3</button>
          <button className={players === 4 ? "active" : "inactive"} onClick={() => setPlayers(4)} type="button">4</button>
          </div>

      </div>
      <div className="confirm">
        <h3>{`Book Tee-Time`}</h3>
        <h2>{`${time} on ${month}-${day}`}</h2>
      </div>
    </div>
  );

  return (
    <div className="box">
      <h1>Book a tee-time</h1>
      {prompt}
    </div>
  );
};
