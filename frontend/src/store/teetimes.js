import { csrfFetch } from "./csrf";

const GET_TEETIMES = "Teetimes/getTeetimes";
const NEW_TEETIME = "Teetimes/newTeetime";
const EDIT_TEETIME = "Teetimes/editTeetime"

const loadTeetimes = (teetimes) => {
  return {
    type: GET_TEETIMES,
    payload: teetimes,
  };
};

const newTeetime = (teetime) => {
  return {
    type: NEW_TEETIME,
    payload: teetime,
  };
};

const updateTeetime = (teetime) => {
  return {
    type: EDIT_TEETIME,
    payload: teetime,
  };
};

export const getTeetimes = () => async (dispatch) => {
  const response = await csrfFetch("/api/teetimes");

  let teetimesObj = {};

  if (response.ok) {
    const data = await response.json();
    console.log(await data.teeTimes);
    dispatch(loadTeetimes(data.teeTimes));
    data.teeTimes.forEach((a) => (teetimesObj[a.id] = a));
    return teetimesObj;
  }
};

export const createTeetime = (teetime) => async (dispatch) => {
  console.log(teetime);
  try {
    const response = await csrfFetch("/api/teetimes", {
      method: "POST",
      body: JSON.stringify(teetime),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const teetimeNew = await response.json();
      console.log(teetimeNew);
      dispatch(newTeetime(teetimeNew));
      return teetimeNew;
    } else {
      const errorData = await response.json();
      return { errors: errorData.errors };
    }
  } catch (error) {
    return { errors: ["An unexpected error occurred."] };
  }
};

export const editTeetime = (teetime) => async (dispatch) => {
  console.log(teetime);
  try {
    const response = await csrfFetch(`/api/teetimes/${teetime.id}`, {
      method: "PUT",
      body: JSON.stringify(teetime),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const teetimeNew = await response.json();
      console.log(teetimeNew);
      dispatch(updateTeetime(teetimeNew));
      return teetimeNew;
    } else {
      const errorData = await response.json();
      return { errors: errorData.errors };
    }
  } catch (error) {
    return { errors: ["An unexpected error occurred."] };
  }
};


const initialState = {};

const teetimesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEETIMES: {
      const allTeetimes = [];
      action.payload.forEach((a) => {
        allTeetimes.push(a);
      });
      return {...state, allTeetimes};
    }
    case NEW_TEETIME: {
      return { ...state, newTeetime: action.payload };
    }
    case EDIT_TEETIME: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return { ...newState, newTeetime: action.payload };
    }

    default:
      return state;
  }
};

export default teetimesReducer;
