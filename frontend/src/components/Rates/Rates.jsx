import { useEffect, useState } from "react";
import "./Rates.css";
import { getRates } from "../../store/rates";
import { useDispatch } from "react-redux";

export const Rates = () => {
  const dispatch = useDispatch();
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      const allRates = await dispatch(getRates());
      setRates(await allRates);
    };
    fetchRates();
  }, [dispatch]);

  return (
    <div className="fees">
      <img
        src="/BT5A1486.jpg"
        className="background-rates"
        alt="Picture of clubhouse"
      />
      <div className="rates">
        <h1>Rates</h1>
        <div className="season">
        <div className="spring">
          <div className="subtitle">
            <h2>Spring</h2>
          </div>
          <div className="prices">
            <div className="cost">
              <p>18 holes:</p>
              <ul>
                {rates.eighteenHoles
                  ? "$" + rates.eighteenHoles.price
                  : "Loading..."}
              </ul>
            </div>
            <div className="cost">
              <p>9 holes:</p>
              <ul>
                {rates.nineHoles ? "$" + rates.nineHoles.price : "Loading..."}
              </ul>
            </div>
            <div className="cost" id="cart">
              <p>+ Cart Seat:</p>
              <ul>
                {rates.cartSeat ? "$" + rates.cartSeat.price : "Loading..."}
              </ul>
            </div>
            <div className="cost">
              <p>Twilight {`(4pm):`}</p>
              <ul>$30</ul>
            </div>
            <div className="cost">
              <p>Early Bird {`(Before 8am):`}</p>
              <ul>$30</ul>
            </div>
            <div className="cost">
              <p>Junior (17-):</p>
              <ul>$25</ul>
            </div>
            <div className="cost">
              <p>Senior (60+):</p>
              <ul>$30</ul>
            </div>
          </div>
        </div>
        <div className="summer">
          <div className="subtitle">
            <h2>Summer</h2>
          </div>
          <div className="prices">
            <div className="cost">
              <p>18 holes:</p>
              <ul>
                {rates.eighteenHoles
                  ? "$" + rates.eighteenHoles.price
                  : "Loading..."}
              </ul>
            </div>
            <div className="cost">
              <p>9 holes:</p>
              <ul>
                {rates.nineHoles ? "$" + rates.nineHoles.price : "Loading..."}
              </ul>
            </div>
            <div className="cost" id="cart">
              <p>+ Cart Seat:</p>
              <ul>
                {rates.cartSeat ? "$" + rates.cartSeat.price : "Loading..."}
              </ul>
            </div>
            <div className="cost">
              <p>Twilight {`(4pm):`}</p>
              <ul>$30</ul>
            </div>
            <div className="cost">
              <p>Early Bird {`(Before 8am):`}</p>
              <ul>$30</ul>
            </div>
            <div className="cost">
              <p>Junior (17-):</p>
              <ul>$25</ul>
            </div>
            <div className="cost">
              <p>Senior (60+):</p>
              <ul>$30</ul>
            </div>
          </div>
        </div>
        <div className="fall">
          <div className="subtitle">
            <h2>Fall</h2>
          </div>
          <div className="prices">
            <div className="cost">
              <p>18 holes:</p>
              <ul>
                {rates.eighteenHoles
                  ? "$" + rates.eighteenHoles.price
                  : "Loading..."}
              </ul>
            </div>
            <div className="cost">
              <p>9 holes:</p>
              <ul>
                {rates.nineHoles ? "$" + rates.nineHoles.price : "Loading..."}
              </ul>
            </div>
            <div className="cost" id="cart">
              <p>+ Cart Seat:</p>
              <ul>
                {rates.cartSeat ? "$" + rates.cartSeat.price : "Loading..."}
              </ul>
            </div>
            <div className="cost">
              <p>Twilight {`(4pm):`}</p>
              <ul>$30</ul>
            </div>
            <div className="cost">
              <p>Early Bird {`(Before 8am):`}</p>
              <ul>$30</ul>
            </div>
            <div className="cost">
              <p>Junior (17-):</p>
              <ul>$25</ul>
            </div>
            <div className="cost">
              <p>Senior (60+):</p>
              <ul>$30</ul>
            </div>
          </div>
        </div>
        <div className="winter">
          <div className="subtitle">
            <h2>Winter</h2>
          </div>
          <div className="prices">
            <div className="cost">
              <p>18 holes:</p>
              <ul>
                {rates.eighteenHoles
                  ? "$" + rates.eighteenHoles.price
                  : "Loading..."}
              </ul>
            </div>
            <div className="cost">
              <p>9 holes:</p>
              <ul>
                {rates.nineHoles ? "$" + rates.nineHoles.price : "Loading..."}
              </ul>
            </div>
            <div className="cost" id="cart">
              <p>+ Cart Seat:</p>
              <ul>
                {rates.cartSeat ? "$" + rates.cartSeat.price : "Loading..."}
              </ul>
            </div>
            <div className="cost">
              <p>Twilight {`(4pm):`}</p>
              <ul>$30</ul>
            </div>
            <div className="cost">
              <p>Early Bird {`(Before 8am):`}</p>
              <ul>$30</ul>
            </div>
            <div className="cost">
              <p>Junior (17-):</p>
              <ul>$25</ul>
            </div>
            <div className="cost">
              <p>Senior (60+):</p>
              <ul>$30</ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
