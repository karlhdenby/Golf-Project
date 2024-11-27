import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeetimes } from "../../store/teetimes";
import "./TeeTimePage.css";
import { BookingModal } from "./BookingModal";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";

export const TeeTimes = () => {
  const [currentTime, setCurrentTime] = useState("")
  const { month, day } = useParams();
  const {setModalContent} = useModal()
  const dispatch = useDispatch();
  const [times, setTimes] = useState([]);
  const user = useSelector((state) => state.session.user)

  const dateMaker = (date) => {
    let pm = parseInt(date.split(":")[0]) >= 12;
    let [hours, minutes] = date.split(":");
    hours = pm ? hours - 12 || 12 : parseInt(hours);
    return `${hours}:${minutes}${pm ? "pm" : "am"}`;
  };


  useEffect(() => {
    const fetchRates = async () => {
      const data = await dispatch(getTeetimes());
      const timesArr = Object.values(data)
        .filter(
          (a) => a.time.split("T")[0].split("-")[1] === month &&
                 a.time.split("T")[0].split("-")[2] === day
        )
        .map((a) => dateMaker(a.time.split("T")[1].split(".")[0]));
      setTimes(timesArr);
    };
    fetchRates();
  }, [dispatch, day, month]);

  const noUserPrompt = (time) => (
    <div className="no-user">
      <h1>Not logged in</h1>
      <h2>Would you like to sign in?</h2>
      <p> ( You can still book a tee-time without signing in! )</p>
      <div className="no-user-buttons">
        <OpenModalButton
          className="no-user-sign-in-button"
          buttonText="Sign In"
          modalComponent={<LoginFormModal />} />
        <button onClick={() => {
          setModalContent(<BookingModal time={time} month={month} day={day} />)
      }} className="no-user-continue-button">Continue</button>
      </div>
    </div>
  )


  const generateSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 18; hour++) {
      const isPM = hour >= 12;
      const displayHour = hour > 12 ? hour - 12 : hour;
      const hourLabel = `${displayHour}${isPM ? "pm" : "am"}`;
      const timeSlots = ["00", "12", "24", "36", "48"].map(
        (minute) => `${displayHour}:${minute}${isPM ? "pm" : "am"}`
      );

      slots.push(
        <div className={`hour-group`} key={hour}>
          <div className="left">
            <h2 className="label">{hourLabel}</h2>
          </div>
          {timeSlots.map((time) => (
            <div className="time" key={time}>
              <h2 onClick={async () => {
                await setCurrentTime(time)
                console.log(currentTime)
                if (user) {
                !times.includes(currentTime) ? setModalContent(<BookingModal time={time} month={month} day={day} />) : console.log(time)
                }
                else {
                  setModalContent(noUserPrompt(time))
                }
                }} className={times.includes(time) ? "unavailable" : "available"}>
                {time}
              </h2>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="tee-time-page">
      <h1>Select a Time</h1>
      {slots}
      </div>
    );
  };

  return <div className="booking">{generateSlots()}</div>;
};
