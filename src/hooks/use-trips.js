/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libraries/firebase';

const useTrips = () => {
  
  const [trips, setTrips] = useState([]);
  console.log("useTrips hook calling");
  const [user] = useAuthState(auth);

  

  useEffect(() => {

    async function getTrips() {
      try {
        const response = await axios.get(
          "https://shipfair-a6766-default-rtdb.firebaseio.com/trips.json"
        );
        console.log(response);
        const data = response.data;
        let pkgs = [];

        for (const key in data) {
          console.log(key,data[key])
          if (data[key].contact === user?.email) {
            pkgs.push({
              id: key,
              title: data[key].title,
              description: data[key].description,
              contact: data[key].contact,
              capacity:data[key].capacity,
              date:data[key].date,
              number:data[key].number,
              by: data[key].by
            });
          }
        }
        console.log("My packages",pkgs);
        localStorage.setItem('trips', JSON.stringify(pkgs))
        setTrips(pkgs);

      } catch (error) {
        console.error(error);
      }
    }
    getTrips();

  }, [trips]);

  return { trips };
};

export default useTrips;
