import { weekMaker } from "./calendarHelper";
import './MonthView.css'

export const MonthView = () => {
  const weeks = weekMaker();
  
  return (
    <div className="days">
    <div className="week-days">
        <p>M</p>
        <p>T</p>
        <p>W</p>
        <p>T</p>
        <p>F</p>
        <p>S</p>
        <p>S</p>
    </div>
    {weeks.map((week, weekIndex) => {
        return (
            <div className={`week-${weekIndex}`} key={weekIndex}>
            {week.map((day) => {
                return(
                    <p key={day} className={day}>
                {day}
                </p>
                )
            })}
            </div>
        )
    })}
    </div>
  )
}