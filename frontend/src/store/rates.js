import { csrfFetch } from "./csrf";

const GET_RATES = "Rates/getRates";

const loadRates = (rates) => {
  return {
    type: GET_RATES,
    payload: rates,
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

const initialState = {};

const ratesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RATES: {
      const allRates = {};
      action.payload.forEach((a) => (allRates[a.item] = a));
      console.log(allRates)
      return allRates;
    }

    default:
      return state;
  }
};

export default ratesReducer;
