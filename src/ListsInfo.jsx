



import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";
import Footer from "./FooterSection";
import Header from "./Header";
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";
import { useMutation } from "@apollo/client/react";

const ListingInfo = gql`
  query ListingInfo($id: ID!) {
    listing(id: $id) {
      id
      title
      images
      address
      guests
      bedrooms
      beds
      bathrooms
      rating
    }
  }
`;


const addQuery = gql`
     mutation addFavorites($listingId: ID!) {
       addFavorite(listingId: $listingId) {
      id
    }
  }
`;

const ListInfo = () => {
    const [addFavorite] = useMutation(addQuery);
    const [favorite, setFavorite] = useState(false)





    const { id } = useParams();
    const { data, loading, error } = useQuery(ListingInfo, {
        variables: { id: id }
    });
    const room = data?.listing;

    return (
        <>
            <Header />
            <div className="infoWrapper">
                <div className="infoHeader">
                    <h3>{room?.title}</h3>
                    <div style={{display: "flex" , alignItems:"center",fontSize:"20px"}}>
                        <p ><ion-icon name="share-outline"></ion-icon> Share</p>

                        <IconButton
                        style={{color:"black", fontSize:"20px"}}
                            className="FavoriteBtn"
                            onClick={() => {
                                addFavorite({ variables: { listingId: room?.id } });
                                setFavorite(prev => !prev);
                            }}
                        >
                            {favorite ? (
                                <>
                                    <FavoriteIcon color="error" />
                                    <p>Saved</p>
                                </>
                            ) : (
                                <>
                                    <FavoriteBorderIcon />
                                    <p>Save</p>
                                </>
                            )}
                        </IconButton>

                    </div>
                </div>

                <img src={room?.images} />

                <h3>Entire home in {room?.address}</h3>
                <h4> <ion-icon name="star" className="starIcon"></ion-icon> {room?.rating}</h4>
                <p>{room?.guests} guests · {room?.bedrooms} bedroom ·
                    {room?.beds} bed · {room?.bathrooms}  private bath
                </p>

                <div className="Form">
                    <h3>Add dates for prices</h3>
                    <div className="formHeader">
                        <div className="checkIn">
                            <small>CHECK-IN</small><br />
                            <input type="date" />
                        </div>
                        <div className="checkOut">
                            <small>CHECKOUT</small><br />
                            <input type="date" />
                        </div>

                    </div>


                    <div className="guestsInput">
                        <small>GUESTS</small><br />
                        <input style={{fontSize:"18px"}} placeholder="1" type="number" />
                    </div>

                    <Button variant="contained" color="error" >Check availability</Button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ListInfo;

