import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import "./BookingModal.css";
import { createTeetime } from "../../store/teetimes";
import { editTeetime } from "../../store/teetimes";

const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export const BookingModal = (info) => {
  const { time, month, day, firstName, lastName, playerCount, id, navigate } =
    info;
  (info);
  const [players, setPlayers] = useState(playerCount || 1);
  const [first, setFirst] = useState(firstName || "");
  const [last, setLast] = useState(lastName || "");
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const edit = id;

  const reverseDateMaker = (time) => {
    let [rawTime, period] = time.split(/(am|pm)/i);
    let [hours, minutes] = rawTime.trim().split(":");

    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    } else if (period.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    if (isNaN(hours) || isNaN(minutes) || isNaN(month) || isNaN(day)) {
      throw new Error("Invalid input values for time, month, or day.");
    }

    const currentDate = new Date();
    let oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(currentDate.getMonth() + 1);
    let currentYear

    if (month - 1 == currentDate.getMonth()) currentYear = currentDate.getUTCFullYear();
    else if (month - 1 == oneMonthFromNow.getMonth()) currentYear = oneMonthFromNow.getUTCFullYear();


    let bookingDate = new Date(
      Date.UTC(currentYear, month - 1, day, hours, minutes)
    );


    return bookingDate.toISOString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submit = async () => {
      if (!players || !first || !last || !time) {
        setErrors("Please fill form to completion");
      } else {
        await dispatch(
          createTeetime({
            username: user?.username || undefined,
            players,
            firstName: first,
            lastName: last,
            open: players < 4,
            time: reverseDateMaker(time),
          })
        );
        navigate("/teetimes/manage");
        closeModal();
      }
    };
    submit();
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const submit = async () => {
      if (!players || !first || !last || !time) {
        setErrors("Please fill form to completion");
      } else {
        await dispatch(
          editTeetime({
            id,
            username: user?.username || undefined,
            players,
            firstName: first,
            lastName: last,
            open: players < 4,
            time: reverseDateMaker(time),
          })
        );
        navigate("/teetimes/manage");
        closeModal();
      }
    };
    submit();
  };

  const prompt = (
    <div className="more-box">
      <h1>Book a Tee-Time</h1>
      {errors ? <h4>{errors}</h4> : ""}
      <div className="first-name">
        <h3>First Name</h3>
        <textarea
          maxLength={25}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="John"
          defaultValue={firstName}
        ></textarea>
      </div>
      <div className="last-name">
        <h3>Last Name</h3>
        <textarea
          maxLength={25}
          onChange={(e) => setLast(e.target.value)}
          placeholder="Doe"
          defaultValue={lastName}
        ></textarea>
      </div>
      <div className="players">
        <h3>Select Players</h3>
        <div className="players-buttons">
          <button
            className={players === 1 ? "active-button" : "inactive-button"}
            onClick={() => setPlayers(1)}
            type="button"
          >
            1
          </button>
          <button
            className={players === 2 ? "active-button" : "inactive-button"}
            onClick={() => setPlayers(2)}
            type="button"
          >
            2
          </button>
          <button
            className={players === 3 ? "active-button" : "inactive-button"}
            onClick={() => setPlayers(3)}
            type="button"
          >
            3
          </button>
          <button
            className={players === 4 ? "active-button" : "inactive-button"}
            onClick={() => setPlayers(4)}
            type="button"
          >
            4
          </button>
        </div>
      </div>
      <div className="confirm">
        <button onClick={edit ? handleEdit : handleSubmit}>
          {edit ? `Edit Tee-Time` : `Book Tee-Time`}
        </button>
        <h2>{`${time} on ${months[month]} ${day}`}</h2>
      </div>
    </div>
  );

  return <div className="box">{prompt}</div>;
};
