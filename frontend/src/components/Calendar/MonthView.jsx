import { weekMaker } from "./calendarHelper";
import "./MonthView.css";
import {useNavigate} from "react-router-dom"

export const MonthView = () => {
  // HELPER FUNCTIONS AND STUFF => START HERE
  const navigate = useNavigate()
  const currentDate = new Date();
  const oneMonthFromNow = new Date(currentDate);
  oneMonthFromNow.setMonth(currentDate.getMonth() + 1);
  const daysInMonth = {
    jan: "January",
    feb: "February",
    mar: "March",
    apr: "April",
    may: "May",
    jun: "June",
    jul: "July",
    aug: "August",
    sep: "September",
    oct: "October",
    nov: "November",
    dec: "December",
  };
  const monthsNum = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };
  const weeks = weekMaker();
  const nextWeeks = weekMaker("next");
  const highlight = new Date().toString().split(" ")[2];
  const year = currentDate.toDateString().split(" ")[3];
  const nextYear = currentDate.toDateString().split(" ")[3];
  const monthName = (currentDate.toString().split(" ")[1].toLowerCase());
  const nextMonthName = (oneMonthFromNow.toString().split(" ")[1].toLowerCase());
  console.log(nextWeeks)
  // HELPER FUNCTIONS => END HERE

  return (
    <div className="body">
      <div className="days">
        <div className="month-label">
          <h1>{`${daysInMonth[monthName]}, ${year}`}</h1>
        </div>
        <div className="week-days">
          <div className="monday">
            <p>Monday</p>
          </div>
          <div className="tuesday">
            <p>Tuesday</p>
          </div>
          <div className="wednesday">
            <p>Wednesday</p>
          </div>
          <div className="thursday">
            <p>Thursday</p>
          </div>
          <div className="friday">
            <p>Friday</p>
          </div>
          <div className="saturday">
            <p>Saturday</p>
          </div>
          <div className="sunday">
            <p>Sunday</p>
          </div>
        </div>
        <div className="month">
          {weeks.map((week, weekIndex) => {
            return (
              <div className={`week-${weekIndex}`} key={weekIndex}>
                {week.map((day) => {
                  return (
                    <div
                      onClick={() => navigate(`/teetimes/${monthsNum[monthName]}/${day}`)}
                      key={day}
                      className={day}
                      id={day == highlight ? "today" : ""}
                    >
                      <p>{day}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="month-label">
          <h1>{`${daysInMonth[nextMonthName]}, ${nextYear}`}</h1>
        </div>
        <div className="week-days">
          <div className="monday">
            <p>Monday</p>
          </div>
          <div className="tuesday">
            <p>Tuesday</p>
          </div>
          <div className="wednesday">
            <p>Wednesday</p>
          </div>
          <div className="thursday">
            <p>Thursday</p>
          </div>
          <div className="friday">
            <p>Friday</p>
          </div>
          <div className="saturday">
            <p>Saturday</p>
          </div>
          <div className="sunday">
            <p>Sunday</p>
          </div>
        </div>
        <div className="next-month">
          {nextWeeks.map((week, weekIndex) => {
            return (
              <div className={`week-${weekIndex}`} key={weekIndex}>
                {week.map((day) => {
                  return (
                    <div onClick={() => navigate(`/teetimes/${monthsNum[nextMonthName]}/${day}`)} key={day} className={day}>
                      <p>{day}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
