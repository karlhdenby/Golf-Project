import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTeetimes } from "../../store/teetimes";
import "./TeeTimePage.css";

export const TeeTimes = () => {
  const dispatch = useDispatch();
  const { month, day } = useParams();
  const [times, setTimes] = useState([]);

  const dateMaker = (date) => {
    let pm = parseInt(date.split(":")[0]) >= 12;
    let [hours, minutes] = date.split(":");
    hours = pm ? hours - 12 || 12 : parseInt(hours);
    return `${hours}:${minutes}${pm ? "pm" : "am"}`;
  };

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
              <h2 className={times.includes(time) ? "unavailable" : "available"}>
                {time}
              </h2>
            </div>
          ))}
        </div>
      );
    }
    return slots;
  };

  return <div className="booking">{generateSlots()}</div>;
};
