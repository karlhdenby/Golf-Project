import { useEffect } from "react";
import {useSelector} from "react-redux";

export const ManageTime = () => {
  let teetime = useSelector((state) => state.teetimes.newTeetime);
  const user = useSelector((state) => state.session.user)

  const dateMaker = (date) => {
    let pm = parseInt(date.split(":")[0]) >= 12;
    let [hours, minutes] = date.split(":");
    hours = pm ? hours - 12 || 12 : parseInt(hours);
    return `${hours}:${minutes}${pm ? "pm" : "am"}`;
  };
  
  console.log(teetime)
  if (teetime.time) console.log(dateMaker(teetime?.time).split("T")[0])
  console.log(dateMaker(teetime?.time))


  return (
    <div className="manage-time">
    <h1>Success!</h1>
    <h2>Make changes to your tee time</h2>
    {user ? "" : <h3>WARNING: You are not signed in. If you click off this page you will no longer be able to edit your tee time</h3>}

    </div>
  )
};
