import { useState } from "react";
import "./RatesModal.css";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editRate, createRate } from "../../store/rates";

export const RatesModal = (info) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const { edit, rate, navigate } = info;
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(rate?.item || "");
  const [price, setPrice] = useState(rate?.price || 1);
  const [description, setDescription] = useState(rate?.description || "");
  console.log(edit, rate);

  const handleEdit = () => {
    if (!name || !price) setErrors("Please fill out form to completion");
    const edit = async () => {
      await dispatch(
        editRate({
          id: rate?.id,
          item: name,
          price: price,
          description: description,
        })
      );
    };
    edit();
    navigate("/teetimes/success");
    closeModal();
  };

  const handleAdd = () => {
    const add = async () => {
      await dispatch(
        createRate({
          item: name,
          price: price,
          description: description,
        })
      );
    };
    add();
    navigate("/teetimes/success");
    closeModal();
  };

  return (
    <div className="rates-modal">
      <h1>{rate ? rate.item : "Create a rate"}</h1>
      {errors ? <h4>{errors}</h4> : ""}
      <div className="name">
        <h3>Name</h3>
        <textarea
          onChange={(e) => setName(e.target.value)}
          placeholder="18holes"
          defaultValue={name}
        ></textarea>
      </div>
      <div className="last-name">
        <h3>Price</h3>
        <input
          type="number"
          placeholder="10"
          onChange={(e) => setPrice(e.target.value)}
        ></input>
      </div>
      <div className="description">
        <h3>Description</h3>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description || ""}
        ></textarea>
      </div>
      <div className="confirm">
        <button onClick={edit ? handleEdit : handleAdd}>
          {edit ? `Edit Rate` : `Create Rate`}
        </button>
      </div>
    </div>
  );
};
