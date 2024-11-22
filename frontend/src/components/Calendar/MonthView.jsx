import { weekMaker } from "./calendarHelper";
import './MonthView.css'

export const MonthView = () => {
  const weeks = weekMaker();
  const date = new Date().toString().split(" ");
  const today = date[2]
  console.log(today)
  
  return (
    <div className="days">
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
    {weeks.map((week, weekIndex) => {
        return (
            <div className={`week-${weekIndex}`} key={weekIndex}>
            {week.map((day) => {
                return(
                    <div key={day} className={day}>
                        <p>{day}</p>
                </div>
                )
            })}
            </div>
        )
    })}
    </div>
  )
}