import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NavigationBar } from "../components";
import { FeedContext } from "../context/feed-context";
import "../stylesheets/AddTrip.scss";
import { auth, db } from "../libraries/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddTrip = () => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("Lahore");
  const [to, setTo] = useState("Islamabad");
  const [DepartureCode, setDepartureCode] = useState("");
  const [ArrivalCode, setArrivalCode] = useState("");
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState("");

  const [user] = useAuthState(auth);
  const pkgCtx = useContext(FeedContext);
  const cities = ['Lahore', 'Islamabad', 'Karachi', 'Quetta'];
  const [startDate, setStartDate] = useState(new Date());
  const [number, setNumber] = useState("")


  const history = useHistory();


  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      console.log("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    fetchUserName();
  }, [user]);

  // ! Sending data to Firebase
  const sendingToFirebaseHandler = async (myObj) => {
    await fetch('https://shipfair-a6766-default-rtdb.firebaseio.com/trips.json', {
      method:'POST',
      body: JSON.stringify({
        ...myObj
      })
    })
  };

  const sendingAllToFirebaseHandler = async (myObj) => {
    await fetch('https://shipfair-a6766-default-rtdb.firebaseio.com/all-trips.json', {
      method:'POST',
      body: JSON.stringify({
        ...myObj
      })
    })
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    pkgCtx.addTrips({ id, title, description, from, to, capacity, startDate ,number});

    sendingToFirebaseHandler({ id, title, description, from, number, to, by:name, contact: user?.email, date:startDate.toLocaleDateString(), capacity:capacity})
    sendingAllToFirebaseHandler({ id, title, description, from, to, number, by:name, contact: user?.email, date:startDate.toLocaleDateString(), capacity:capacity })

    setTitle("");
    setDescription("");
    setFrom("Lahore");
    setTo("Islamabad");

    history.push("/trips");
  };

  return (
    <>
      <div className="dashboard_greeting_container">
        <NavigationBar />
      </div>
      <div className="dashboard_container trips">
        <form onSubmit={submitHandler}>
          <h1 className="add_trip_heading">Add a Trip</h1>
          Give us information on your departure flight so we can optimize the
          packages that you see
          <div>
            <div className="add_trip_container">
              <label className="trip_input_labels " htmlFor="title">
                Title
              </label>
              <input
                className="add_trip_input"
                type="text"
                id="title"
                autoComplete="off"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <div className="add_trip_desc_container">
                <label className="trip_input_labels one" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="add_trip_description"
                  autoComplete="off"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="10"
                  required
                ></textarea>
              </div>
              <div className="airport_departure_code">
              <label className="trip_input_labels " htmlFor="DepartureCode">
                Departure Airport Code
              </label>
              <input
                className="add_trip_input code"
                type="text"
                id="DepartureCode"
                autoComplete="off"
                value={DepartureCode}
                required
                onChange={(e) => setDepartureCode(e.target.value)}
              />
              </div>
              <div className="airport_departure_code">
              <label className="trip_input_labels " htmlFor="ArrivalCode">
              Arrival Airport Code
              </label>
              <input
                className="add_trip_input code"
                type="text"
                id="ArrivalCode"
                autoComplete="off"
                value={ArrivalCode}
                required
                onChange={(e) => setArrivalCode(e.target.value)}
              />
              </div>
             
            </div>
            <div className="add_trip_options_container">
              <label className="trip_input_labels " htmlFor="from">
                From
              </label>
              <select
                className="add_trip_input select_box"
                name=""
                value={from}
                id="from"
                onChange={(e) => setFrom(e.target.value)}
              >
                {
                  cities.map(city => <option value={city}>{city}</option>)
                }
               
              </select>
              <label className="trip_input_labels " htmlFor="to">
                To
              </label>
              <select
                className="add_trip_input"
                name=""
                value={to}
                id="to"
                onChange={(e) => setTo(e.target.value)}
              >
                {
                  cities.filter(city => city!==from).map(city => <option value={city}>{city}</option>)
                }
               
              </select>
            </div>
            <div className="date_picker">
              <label>When you want to take this trip? Select your desired day:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> 
            </div>
            <div>
            <label htmlFor="">Phone no.:</label>
            <input type="text" placeholder="e.g: +92300-4579632"  autoComplete="off"
                value={number}  
                onChange={(e) => setNumber(e.target.value)}
                /></div>
          </div>
          <div>
            <label htmlFor="">Carrying Capacity</label>
            <input type="text" placeholder="e.g: 5kg"  autoComplete="off"
                value={capacity}  
                onChange={(e) => setCapacity(e.target.value)}
                /></div>
          
          <div>
            <button className="button add_trip_submit">Submit</button>
          </div>
        </form>
        <Footer/>
      </div>
    </>
  );
};

export default AddTrip;
