



import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";
import Footer from "./FooterSection";
import Header from "./Header";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Controller, useForm } from "react-hook-form";

const ListingInfo = gql`
  query ListingInfo($id: ID!) {
    listing(id: $id) {
      id
      title
      images
      address
      description
      guests
      bedrooms
      beds
      bathrooms
      rating
      reviewsCount
      pricePerNight
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





const addBookings = gql`
      mutation Mutation($checkIn: String!, $checkOut: String!, $guests: Int!, $listingId: ID!) {
    createBooking(checkIn: $checkIn, checkOut: $checkOut, guests: $guests, listingId: $listingId) {
    checkIn
    checkOut
    guests
    id
  }
}
`



const ListInfo = () => {
    const [addFavorite] = useMutation(addQuery);
    const [Mutation] = useMutation(addBookings)
    const [favorite, setFavorite] = useState(false)


    const { control, handleSubmit } = useForm({
        defaultValues: { chekIn: new Date(), chekOut: "", guests: "1" }
    })




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
                    <div style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
                        <Typography className="share" variant="inherit" ><ion-icon name="share-outline"></ion-icon>
                            <span>Share</span>
                        </Typography >

                        <IconButton
                            style={{ color: "black", fontSize: "20px" }}
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
                                    <FavoriteBorderIcon color="error" />
                                    <p>Save</p>
                                </>
                            )}
                        </IconButton>

                    </div>
                </div>

                <img src={room?.images} />

                <h3>Entire home in {room?.address}</h3>

                <p>{room?.guests} guests · {room?.bedrooms} bedroom ·
                    {room?.beds} bed · {room?.bathrooms}  private bath
                </p>


                <div className="statusWrapper">
                    <p style={{ fontWeight: "600", fontSize: "17px" }}>
                        {room?.rating}<br />
                        <ion-icon style={{ fontSize: "10px" }} name="star" className="starIcon"></ion-icon>
                    </p>

                    <p>
                        Guest <br />
                        favorite
                    </p>

                    <p>{room?.reviewsCount}<br />
                        Reviws
                    </p>
                </div>


                <div className="listingDescription"><p style={{ marginTop: "20px" }}>
                    {room?.description}</p>
                </div>
                <div className="Form">
                    <h3>Add dates for price</h3>
                    <div className="formHeader">
                        <div className="checkIn">
                            <small>CHECK-IN</small><br />

                            <Controller
                                name="checkIn"

                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        type="date"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos kelish sanasini kiriting",
                                            }
                                        }}

                                        placeholder="CHECK-IN"
                                        {...field}
                                        size="small"
                                        fullWidth
                                        error={error}

                                        helperText={error && error.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="checkOut">
                            <small>CHECKOUT</small><br />
                            <Controller
                                name="checkOut"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        type="date"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos ketish sanasini  kiriting",
                                            }
                                        }}

                                        placeholder="CHECKOUT"
                                        {...field}
                                        size="small"
                                        fullWidth
                                        error={error}

                                        helperText={error && error.message}
                                    />
                                )}
                            />
                        </div>

                    </div>


                    <div className="guestsInput">
                        <small>GUESTS</small><br />
                        <Controller
                            name="guests"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    type="number"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Iltimos mehmonlar sonini kiriting",
                                        }
                                    }}

                                    placeholder="CHECK-IN"
                                    {...field}
                                    size="small"
                                    fullWidth
                                    error={error}

                                    helperText={error && error.message}
                                />
                            )}
                        />
                    </div>

                    <Button variant="contained" color="error" loading={loading}
                        onClick={handleSubmit(((val) => (
                            Mutation({
                                variables: {
                                    listingId: room?.id, checkIn: val.checkIn,
                                    checkOut: val.checkOut, guests: Number(val.guests)
                                }
                            })
                        )))} >Check availability</Button>
                </div>

            </div>
            <Footer />
        </>
    );
}

export default ListInfo;

