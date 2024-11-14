import { useEffect, useState } from "react";
import "./Teetimes.css";
import { getTeetimes } from "../../store/teetimes";
import { useDispatch} from "react-redux";
import {dateFormat} from './dateHelper'

export const Teetime = () => {
  const dispatch = useDispatch();
  const [teetimes, setTeetimes] = useState([]);

  useEffect(() => {
    const fetchTeetime = async () => {
      const allTeetime = await dispatch(getTeetimes());
      setTeetimes(allTeetime)
    };
    fetchTeetime();
  }, [dispatch]);

  return (
    <div className="teetimes">
    {(Object.values(teetimes)).map((a) => (
      <div className="div" key={a.id}>
        <p>{(dateFormat(a.time))}</p>
      </div>
    ))}
    </div>
  )
};