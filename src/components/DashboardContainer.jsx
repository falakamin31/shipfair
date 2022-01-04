import React, { useContext } from "react";
import { Trips } from "../pages/Trips";
import { PostCard } from "./PostCard";
import { FeedContext } from "../context/feed-context";
import usePackages from '../hooks/use-packages';
import useTrips from "../hooks/use-trips";

export const DashboardContainer = () => {

  // const { items } = useContext(FeedContext);
  const { packages } = usePackages();
  const { trips } = useTrips();

  const items = [ ...packages, ...trips ];

  return <div className="dashboard_container">
    {items.map((item) => <PostCard id={item.id} title={item.title} url={item.url} description = {item.description} contact={item.contact} by={item.by} capacity={item.capacity} date={item.date} number={item.number}/>)}
  </div>;
};
