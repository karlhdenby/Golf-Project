import { csrfFetch } from "./csrf";

const GET_RATES = "Rates/getRates";
const NEW_RATE = "Rates/newRate"
const EDIT_RATE = "Rates/editRate"


const loadRates = (rates) => {
  return {
    type: GET_RATES,
    payload: rates,
  };
};

const newRate = (rate) => {
  return {
    type: NEW_RATE,
    payload: rate,
  };
};

const changeRate = (rate) => {
  return {
    type: EDIT_RATE,
    payload: rate,
  };
};

export const getRates = () => async (dispatch) => {
  const response = await csrfFetch("/api/rates");

  let rates = {}

  if (response.ok) {
    const data = await response.json();
    await dispatch(loadRates(data.Rates));
    data.Rates.forEach((a) => rates[a.item] = a)
    return rates
  }
};

export const createRate = (rate) => async (dispatch) => {
  console.log(rate)
  try {
    const response = await csrfFetch("/api/rates", {
      method: "POST",
      body: JSON.stringify(rate),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const rateNew = await response.json();
      console.log(rateNew)
      await dispatch(newRate(rateNew));
      return rateNew;
    } else {
      const errorData = await response.json();
      return { errors: errorData.errors };
    }
  } catch (error) {
    return { errors: ["An unexpected error occurred."] };
  }
};

export const editRate = (rate) => async (dispatch) => {
  console.log(rate)
  try {
    const response = await csrfFetch(`/api/rates/${rate.id}`, {
      method: "PUT",
      body: JSON.stringify(rate),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const rateNew = await response.json();
      console.log(rateNew)
      await dispatch(changeRate(rateNew));
      return rateNew;
    } else {
      const errorData = await response.json();
      return { errors: errorData.errors };
    }
  } catch (error) {
    return { errors: ["An unexpected error occurred."] };
  }
}


const initialState = {};

const ratesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RATES: {
      const allRates = {};
      action.payload.forEach((a) => (allRates[a.item] = a));
      console.log(allRates)
      return allRates;
    }
    case NEW_RATE: {
      const newState = {...state}
      newState[action.payload.item] = action.payload
      return newState
    }
    case EDIT_RATE: {
      const newState = {...state}
      const select = Object.values(newState).find((rate) => rate.id === action.payload.id)
      newState[select.item] = action.payload
      return newState
    }

    default:
      return state;
  }
};

export default ratesReducer;
