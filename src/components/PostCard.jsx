import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FeedContext } from '../context/feed-context';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../libraries/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const PostCard = props => {
  

  const { removeItem, removePackage, removeTrip } = useContext(FeedContext);

  // console.log(props);
  const location = useLocation();
  // console.log(location.pathname);
  console.log("Trips props",props);

  const [user] = useAuthState(auth);

  async function deletePost(id) {
    // await axios.delete(`https://shipfair-a6766-default-rtdb.firebaseio.com/packages/${props.id}`);
    axios.delete(`https://shipfair-a6766-default-rtdb.firebaseio.com/packages/${id}.json`)
        .then(() => console.log('deleted successfully'));
}
  async function deleteAllPost(id) {
    // await axios.delete(`https://shipfair-a6766-default-rtdb.firebaseio.com/packages/${props.id}`);
    axios.delete(`https://shipfair-a6766-default-rtdb.firebaseio.com/all-packages/${id}.json`)
        .then(() => console.log('deleted successfully'));
}

async function deleteTrip(id) {
  // await axios.delete(`https://shipfair-a6766-default-rtdb.firebaseio.com/packages/${props.id}`);
  axios.delete(`https://shipfair-a6766-default-rtdb.firebaseio.com/trips/${id}.json`)
      .then(() => console.log('deleted successfully'));
}
async function deleteAllTrip(id) {
  // await axios.delete(`https://shipfair-a6766-default-rtdb.firebaseio.com/packages/${props.id}`);
  axios.delete(`https://shipfair-a6766-default-rtdb.firebaseio.com/all-trips/${id}.json`)
      .then(() => console.log('deleted successfully'));
}

  const removeItemHandler = () => {

    removeItem(props.id)
    removePackage(props.id)
    removeTrip(props.id)
    deletePost(props.id)
    deleteTrip(props.id)
    deleteAllPost(props.id);
    deleteAllTrip(props.id);
    
  };
    return (
        <div className="card_container">
            <Card sx={{ maxWidth: 270 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.url || "http://bsmedia.business-standard.com/_media/bs/img/article/2015-08/31/full/1441037121-004.jpg"}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <p>{props.description}</p>

        <p id="">112 to 345</p>
        </Typography>
        <Typography>
          <p>
            Contact at: <a href={`mailto:${props.contact}`}> {props.contact} </a>
          </p>
          <p>Phone number: {props.number}</p>
          <p>Posted by: {props.by}</p>
        </Typography>

        <Typography >
          <p>
          Capacity:{props.capacity}
          </p>
        </Typography>
        <Typography >
        <p>TripDate:{props.date}</p>

        </Typography> 
      </CardContent>
      <CardActions>
        <Button size="small">{new Date().toLocaleDateString()}</Button>
      </CardActions>
      { props.contact === user?.email && <div>
      {location.pathname === '/parcels' ? <button  className="button" onClick={() => { removePackage(props.id) 
      deletePost(props.id)
      deleteAllPost(props.id)
      deleteTrip(props.id)
      deleteAllTrip(props.id)
      }}>Remove</button> : location.pathname === '/trips' ? <button  className="button" onClick={() => { removeTrip(props.id)
      deletePost(props.id)
      deleteAllPost(props.id)
        deleteTrip(props.id)
        deleteAllTrip(props.id)
      } }>Remove</button> :<button className="button" onClick={removeItemHandler}>Remove</button>  }
      </div>}
    </Card>
            
        </div>
    )
}
