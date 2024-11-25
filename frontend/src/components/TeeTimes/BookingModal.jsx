import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import './BookingModal.css'

export const BookingModal = (time) => {
  const [players, setPlayers] = useState(1);
  const user = useSelector((state) => state.session.user);
  console.log(time);
  const { closeModal } = useModal();

  const prompt = (
    <div className="moreBox">
        <div className="first-name">
            <h3>First Name</h3>
            <textarea/>
        </div>
        <div className="last-name">
            <h3>Last Name</h3>
            <textarea/>
        </div>
      <div className="players">
        <h3>Select Players</h3>
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
      </div>
    </div>
  );

  return (
    <div className="box">
      <h1>Hello ahhhhh</h1>
      {prompt}
    </div>
  );
};
