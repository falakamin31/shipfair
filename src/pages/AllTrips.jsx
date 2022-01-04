import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavigationBar } from '../components';
import Footer from '../components/Footer';
import {PostCard} from '../components/PostCard';
import "../stylesheets/AllPackages.scss"


const AllTrips = () => {

    const [trips, setTrips] = useState([]);
    


    useEffect(() => {
        
        async function getPackages() {
            try {
              const response = await axios.get(
                "https://shipfair-a6766-default-rtdb.firebaseio.com/all-trips.json"
              );
              console.log(response);
              const data = response.data;
              let pkgs = [];
      
              for (const key in data) {
                console.log(key,data[key])
                pkgs.push({
                  id: key,
                  title: data[key].title,
                  description: data[key].description,
                  contact: data[key].contact,
                  capacity:data[key].capacity,
                  date:data[key].date,
                  by: data[key].by
                });
              }
              console.log(pkgs);
              localStorage.setItem('packages', JSON.stringify(pkgs))
              setTrips(pkgs);
      
            } catch (error) {
              console.error(error);
            }
          } 
          getPackages();
    
    }, []);

    return (
      <>

      <div className="dashboard_greeting_container">
      <NavigationBar />
    </div>
    <div className="all_pkgs_container">

        <div className='heading_allpkgs'>
            <p >All the universal trips</p> 
            <div className='cards_container'>
                {trips.map(trip => <PostCard key={trip.id} id={trip.id} url={trip.url} title={trip.title} description={trip.description} contact={trip.contact} by={trip.by} capacity={trip.capacity} date={trip.date} number={trip.number}/>)}
            </div>
    </div>
        </div>
            <Footer/>
        </>
    )
}

export default AllTrips
