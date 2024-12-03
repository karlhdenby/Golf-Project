import { useDispatch } from "react-redux";
import { cancelTeetime } from "../../store/teetimes";
import { useModal } from "../../context/Modal";
import "./DeleteModal.css";

export const DeleteModal = (info) => {
  (info) 
  const {id, navigate} = info
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    const remove = async () => {
      await dispatch(cancelTeetime(id));
      ("success!");
      navigate("/teetimes/success");
      closeModal();
    };
    remove();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="delete-modal-box">
      <h1>Are you sure you want to cancel your tee-time?</h1>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={handleClose}>No</button>
    </div>
  );
};
