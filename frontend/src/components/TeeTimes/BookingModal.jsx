import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import './BookingModal.css'
import { createTeetime } from "../../store/teetimes";
import { useParams } from "react-router-dom";

const reverseDateMaker = (date) => {
  let [time, period] = date.split(/(am|pm)/i); // Split the time and period (AM/PM)
  let [hours, minutes] = time.split(":");

  hours = parseInt(hours);

  if (period.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  let bookingDate = new Date(currentYear, month - 1, day, hours, minutes);

  if (bookingDate <= currentDate) {
    bookingDate.setFullYear(currentYear + 1);
  }


  let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes}`;
  return `${bookingDate.getFullYear()}-${(bookingDate.getMonth() + 1).toString().padStart(2, "0")}-${bookingDate.getDate().toString().padStart(2, "0")}T${formattedTime}:00`;
};

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

export const BookingModal = (info) => {

  const { time, month, day, firstName, lastName, playerCount, id, navigate } = info
  console.log(time)
  const [players, setPlayers] = useState(playerCount || 1);
  const [first, setFirst] = useState(firstName || "");
  const [last, setLast] = useState(lastName || "");
  const user = useSelector((state) => state.session.user)
  const [errors, setErrors] = useState("")
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const edit = (id)

  const handleSubmit = (e) => {
    e.preventDefault()
    const submit = async () => {
      if (!players || !first || !last || !time) {
        setErrors("Please fill form to completion")
      }
      else {
      await dispatch(createTeetime({
        username: user?.username || undefined,
        players,
        firstName: first,
        lastName: last,
        open: (players < 4),
        time: (reverseDateMaker(time))
      }))
      navigate('/teetimes/manage')
      closeModal()
    }
    }
    submit()
  }

  // const handleEdit = () => {
  //   e.preventDefault()

  //   const submit = async () => {
  //     if (!players || !first || !last || !time) {
  //       setErrors("Please fill form to completion")
  //     }
  //     else {
  //     await dispatch(editTeetime({
  //       username: user?.username || undefined,
  //       players,
  //       firstName: first,
  //       lastName: last,
  //       open: (players < 4),
  //       time: (reverseDateMaker(time))
  //     }))
  //     navigate('/teetimes/manage')
  //     closeModal()
  //   }
  //   }
  //   submit()
  // }
  // }

  

  const prompt = (
    <div className="more-box">
      <h1>Book a Tee-Time</h1>
      {errors ? <h4>{errors}</h4> : ""}
      <div className="first-name">
        <h3>First Name</h3>
        <textarea onChange={(e) => setFirst(e.target.value)} placeholder="John">{firstName}</textarea>
      </div>
      <div className="last-name">
        <h3>Last Name</h3>
        <textarea onChange={(e) => setLast(e.target.value)} placeholder="Doe">{lastName}</textarea>
      </div>
      <div className="players">
        <h3>Select Players</h3>
        <div className="players-buttons">
          <button className={players === 1 ? "active-button" : "inactive-button"} onClick={() => setPlayers(1)} type="button">1</button>
          <button className={players === 2 ? "active-button" : "inactive-button"} onClick={() => setPlayers(2)} type="button">2</button>
          <button className={players === 3 ? "active-button" : "inactive-button"} onClick={() => setPlayers(3)} type="button">3</button>
          <button className={players === 4 ? "active-button" : "inactive-button"} onClick={() => setPlayers(4)} type="button">4</button>
        </div>

      </div>
      <div className="confirm">
        <button onClick={edit ? handleEdit : handleSubmit}>{edit ? `Edit Tee-Time` :`Book Tee-Time`}</button>
        <h2>{`${time} on ${months[month]} ${day}`}</h2>
      </div>
    </div>
  );

  return (
    <div className="box">
      {prompt}
    </div>
  );
};
