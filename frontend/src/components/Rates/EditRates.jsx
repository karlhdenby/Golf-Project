import "./EditRates.css";
import { getRates } from "../../store/rates";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { RatesModal } from "./RatesModal";
import { useNavigate } from "react-router-dom";

export const EditRates = () => {
  const navigate = useNavigate()
  const {setModalContent} = useModal();
  const dispatch = useDispatch();
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      const allRates = await dispatch(getRates());
      setRates(await allRates);
    };
    fetchRates();
  }, [dispatch]);

  console.log(rates);

  const handleEdit = (rate) => {
    setModalContent(
      <RatesModal edit={true} rate={rate} navigate={navigate}/>
    )

  }

  const handleAdd = (e) => {
    e.preventDefault()
    setModalContent(
      <RatesModal edit={false} navigate={navigate}/>
    )

  }
  
  const generateRates = () => {

    const items = (Object.values(rates)).map((rate) => {
        return (
        <div key={rate.item} className="rate-edit">
            <h2>{rate.item}</h2>
            <h3>Price: {rate.price}</h3>
            <div className="rate-description-edit">
                <h3>Description:</h3>
                <div className="description-box">
                <p>{rate.description || "No description yet."}</p>
                </div>
            </div>
            <button onClick={() => handleEdit(rate)}>Edit</button>
        </div>
        )
      })

      return items
  }

  

  return <div className="manage-rates-page">
    <h1>Edit Rates</h1>
    <div className="rates-edit">
    {generateRates()}
    </div>
    <button onClick={handleAdd} className="add-new-rate">Add new Rate</button>
  </div>
};
