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
      console.log(allRates);
      setRates(allRates);
    };
    fetchRates();
  }, [dispatch]);

  console.log(rates);
  return (
    <>
      <img
        className="background"
        src="/BT5A1397.jpg"
        alt="Picture of clubhouse"
      />
      <h1>Green Fees</h1>
      <div className="rates">
        <div className="spring">
          <div className="subtitle">
            <h2>Spring</h2>
            <img src="/flowers3-svgrepo-com.svg" />
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
            <img src="/sun-solid.svg" />
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
            <img src="/canadian-maple-leaf-brands-solid.svg" />
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
            <img src="/snowflake-solid.svg" />
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
    </>
  );
};
