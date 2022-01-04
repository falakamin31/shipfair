import React,  {useContext} from "react";
import {FeedContext} from '../context/feed-context'
import {
  DashboardContainer,
  DashboardSideBar,
  NavigationBar,
} from "../components";
import { PostCard } from "../components/PostCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as ROUTES from "../constants/routes"
import useTrips from "../hooks/use-trips";
import Footer from "../components/Footer";

export const Trips = () => {
   const TripsCtx = useContext(FeedContext);
  //  const {trips} = TripsCtx;
  //  console.log(trips)
  //  console.log(TripsCtx);
  const history = useHistory();
  // console.log(ROUTES);
  const { trips } = useTrips();

  return (
    <div>
      <div className="dashboard_greeting_container">
        <NavigationBar greeting={"YOUR TRIPS"} />
      </div>
      <DashboardSideBar />
      <div className="dashboard_container">
      <div>
          <button className='button' onClick={() => {history.push(ROUTES.START_TRIPS)}}>Add a Trip</button>
      </div>
        {trips.map((trip) =>(
          <PostCard key={trip.id} id={trip.id} url={trip.url} title={trip.title} description={trip.description} contact={trip.contact} by={trip.by} capacity={trip.capacity} date={trip.date} number={trip.number} />))}
      </div>
      <div>

      </div>
      <Footer/>

    </div>
  );
};
