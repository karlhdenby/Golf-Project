import { useState } from "react";
import "./RatesModal.css";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editRate, createRate, } from "../../store/rates";

export const RatesModal = (info) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const { edit, rate } = info;
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(rate?.item || "");
  const [price, setPrice] = useState(rate?.price || 1);
  const [description, setDescription] = useState(rate?.description || "");

  const handleEdit = () => {
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
    if (!name || !price) setErrors("Please fill out form to completion");
    else {
      edit();
      closeModal();
    }
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
    if (!name || !price) setErrors("Please fill out form to completion");
    else {
      add();
      closeModal();
    }
  };

  return (
    <div className="rates-modal">
      <h1>{rate ? rate.item : "Create a rate"}</h1>
      {errors ? <h4>{errors}</h4> : ""}
      <div className="name">
        <h3>Name</h3>
        <textarea
          required
          maxLength={50}
          onChange={(e) => setName(e.target.value)}
          placeholder="18holes"
          defaultValue={name}
        ></textarea>
      </div>
      <div className="last-name">
        <h3>Price</h3>
        <input
          required
          type="number"
          placeholder="10"
          onChange={(e) => setPrice(e.target.value)}
          defaultValue={price}
          min={1}
          max={100000}
        ></input>
      </div>
      <div className="description">
        <h3>Description</h3>
        <textarea
          defaultValue={description || ""}
          maxLength={150}
          onChange={(e) => {
            setDescription(e.target.value);
            console.log(e.target.value);
          }}
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
