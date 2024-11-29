import { useDispatch, useSelector } from "react-redux";
import "./ManageTime.css";
import { useModal } from "../../context/Modal";
import { BookingModal } from "./BookingModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeetimes } from "../../store/teetimes";

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

const dateMaker = (date) => {
  let pm = parseInt(date.split(":")[0]) >= 12;
  let [hours, minutes] = date.split(":");
  hours = pm ? hours - 12 || 12 : parseInt(hours);
  return `${hours}:${minutes}${pm ? "pm" : "am"}`;
};

export const ManageTime = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent } = useModal();
  const [teetime, setTeetime] = useState({});
  const user = useSelector((state) => state.session.user);
  const [time, setTime] = useState( undefined)
  const [date, setDate] = useState( undefined)
  let open = false

  useEffect(() => {
    const fetch = async () => {
      const tees = await dispatch(getTeetimes());
      const me = Object.values(tees).filter(
        (a) => a.username === user.username
      );
      const created = me.findLast((a) => a);
      setTeetime(created);
      setDate(teetime.time.split("T")[0]);
      setTime(dateMaker(teetime.time));
    };
    
    if (!time) fetch();
  }, [dispatch, user, time, teetime]);
  
  console.log(teetime);
  console.log(months[teetime.time?.split("T")[0].split("-")[1]])

  const handleEdit = () => {
    setModalContent(
      <BookingModal
        time={dateMaker(teetime.time)}
        month={teetime.time?.split("T")[0].split("-")[1]}
        day={teetime.time?.split("T")[0].split("-")[2]}
        firstName={teetime.firstName}
        lastName={teetime.lastName}
        playerCount={teetime.players}
        navigate={navigate}
        id={teetime.id}
      />
    );
  };

  return (
    <div className="manage-time">
      <h1>Success!</h1>
      {user ? (
        ""
      ) : (
        <h3>
          WARNING: You are not signed in. If you click off this page you will no
          longer be able to edit your tee time
        </h3>
      )}
      <p>
        {date} {time}
      </p>
      <p>First Name: {teetime.firstName}</p>
      <p>Last Name: {teetime.lastName}</p>
      <p>Players: {teetime.players}</p>
      <p>Open: {open.toString()}</p>
      {user ? <p>Username: {teetime.username}</p> : ""}
      <h2>Make changes to your tee time?</h2>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};
