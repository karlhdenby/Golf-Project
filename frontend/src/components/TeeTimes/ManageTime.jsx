import { useDispatch, useSelector } from "react-redux";
import "./ManageTime.css";
import { useModal } from "../../context/Modal";
import { BookingModal } from "./BookingModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeetimes } from "../../store/teetimes";
import { DeleteModal } from "./DeleteModal";

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
  12: "December",
};

export const ManageTime = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent } = useModal();
  const [teetime, setTeetime] = useState({});
  const user = useSelector((state) => state.session.user);
  const newest = useSelector((state) => state.teetimes.newTeetime);
  const [time, setTime] = useState(undefined);
  const [date, setDate] = useState(undefined);
  let open = false;

  const dateMaker = (date) => {
    if (!date) return null;
  
    const [hours, minutes] = date.split("T")[1].split(":").map(Number);
  
    const pm = hours >= 12;
    const displayHours = pm ? (hours === 12 ? 12 : hours - 12) : (hours === 0 ? 12 : hours);
  
    return `${displayHours}:${minutes.toString().padStart(2, "0")}${pm ? "pm" : "am"}`;
  };
  

  useEffect(() => {
    const fetch = async () => {
      const tees = await dispatch(getTeetimes());
      const me = Object.values(tees);
      const created = me.findLast((a) => a);
      setTeetime(created);
      setDate(created?.time?.split("T")[0]);
      setTime(dateMaker(created?.time));
    };

    if (!time) fetch();
  }, [dispatch, user, time, teetime]);

  (date, time);
  (teetime);
  (months[teetime?.time?.split("T")[0].split("-")[1]]);

  const handleEdit = () => {
    setModalContent(
      <BookingModal
        time={dateMaker(teetime?.time)}
        month={teetime?.time?.split("T")[0].split("-")[1]}
        day={teetime?.time?.split("T")[0].split("-")[2]}
        firstName={newest?.firstName || teetime?.firstName}
        lastName={newest?.lastName || teetime?.lastName}
        playerCount={newest?.players || teetime?.players}
        navigate={navigate}
        id={teetime?.id}
      />
    );
  };

  const handleDelete = (e) => {
    e.preventDefault()
    const remove = async () => {
      await setModalContent(<DeleteModal id={teetime.id} navigate={navigate}/>);
    }
    ("delete")
    remove()
  };

  const works = (
    <div className="manage-time">
      <h1>Book a tee-time</h1>
      {user ? (
        ""
      ) : (
        <h3>
          WARNING: You are not signed in. If you click off this page you will no
          longer be able to edit your tee time.
        </h3>
      )}
      <p>
        {date} {time}
      </p>
      <p>First Name: {newest?.firstName || teetime?.firstName}</p>
      <p>Last Name: {newest?.lastName || teetime?.lastName}</p>
      <p>Players: {newest?.players || teetime?.players}</p>
      <p>Open: {newest?.open.toString() || open.toString()}</p>
      {user?.username ? (
        <p>Username: {newest?.username || teetime?.username}</p>
      ) : (
        <p></p>
      )}
      <h2>Make changes to your tee time?</h2>
      <button className="edit-button-time" onClick={handleEdit}>
        Edit
      </button>
      {user?.username ? (<button className="delete-button-time" onClick={handleDelete}>
        Delete
      </button>) : <></>}
      
    </div>
  );

  return newest?.firstName || teetime?.firstName ? (
    works
  ) : (
    <div className="manage-time">
      <h1>No available teetimes</h1>
    </div>
  );
};
