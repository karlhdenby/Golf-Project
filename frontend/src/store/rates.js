import { csrfFetch } from "./csrf";

const GET_RATES = "Rates/getRates";
const NEW_RATE = "Rates/newRate"

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

export const getRates = () => async (dispatch) => {
  const response = await csrfFetch("/api/rates");

  let rates = {}

  if (response.ok) {
    const data = await response.json();
    dispatch(loadRates(data.Rates));
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
      dispatch(newRate(rateNew));
      return rateNew;
    } else {
      const errorData = await response.json();
      return { errors: errorData.errors };
    }
  } catch (error) {
    return { errors: ["An unexpected error occurred."] };
  }
};


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
      return {...state, rate: action.payload.rate}
    }

    default:
      return state;
  }
};

export default ratesReducer;
