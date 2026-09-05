import { Button, Container, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography, } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import logo from './assets/Logo.svg';
import Footer from "./FooterSection";
import { Link, Navigate } from "react-router";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import AdminLogin from "./AdminPageLogin";


const AdminPage = () => {

    const [modalOpen, setModalOpen] = useState(false)



    //   const { accessToken, user } = useAuth();
    //   if (!accessToken) return <Navigate to="/login" replace />;
    //   if (user?.role !== "ADMIN") return <Navigate to="/" replace />;
    //   return children;




    const Listing = gql`
         query Listings($limit:Int,) {
         listings(limit: $limit){
            items{
                id
                title
                pricePerNight
                images
                rating
            }
              
         } 
        }
    `;



    const CreateBtn = gql`
        mutation Mutation($input: CreateListingInput!) {
  createListing(input: $input) {
    images
    title
    rating
    bedrooms
    bathrooms
    beds
    pricePerNight
     address
    location
    guests
    amenities
    description
    category
    
    isFeatured
  }
}
    `



    const AddQuery = gql`
    mutation AddFavorite($listingId: ID!) {
     addFavorite(listingId: $listingId) {

    rating
    address
  pricePerNight
    id
    images
    title
  }
}
`;

    const { data, loading, error, refetch } = useQuery(Listing, {
        variables: { limit: 50, }
    })

    const [createListing] = useMutation(CreateBtn);
    const [addFavorite] = useMutation(AddQuery);


    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: "", images: "", rating: "", beds: "", location: "",
            address: "", guests: "", amenities: "", pricePerNight: "", description: "",
            category: "APARTMENT", bedrooms: "", bathrooms: "", isFeatured: false
        }
    })


    const onSubmit = (data) => {


        createListing({
            variables: {

                input: {

                    title: data.title, images: data.images, rating: Number(data.rating), beds: Number(data.beds),
                    location: data.location, address: data.address, guests: Number(data.guests), amenities: data.amenities,
                    pricePerNight: Number(data.pricePerNight), description: data.description, category: data.category,
                    bedrooms: Number(data.bedrooms), bathrooms: Number(data.bathrooms), isFeatured: data.isFeatured
                }

            }
        })
        console.log(data.isFeatured);
        refetch()
        setModalOpen(false)
    }
    return (
        <>


            {modalOpen ?
                <div className="modalWrapper">
                    <div className="modal">
                        <Paper elevation={20} style={{ padding: 20, marginTop: 300, }}>
                            <Stack spacing={3}>
                                <Typography variant="h4" >Add Apartment</Typography>


                                <div className="twoInputWrapper">
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                type="text"
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Iltimos joy nomini kiriting",
                                                    }
                                                }}

                                                placeholder="title"
                                                {...field}
                                                size="small"
                                                fullWidth
                                                error={error}
                                                label="title"
                                                helperText={error && error.message}
                                            />
                                        )}
                                    />



                                    <Controller
                                        name="images"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos rasm linkini kiriting",
                                            }
                                        }}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                type="text"
                                                placeholder="images"
                                                {...field}
                                                size="small"
                                                fullWidth
                                                error={error}
                                                label="images"
                                                helperText={error && error.message}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="twoInputWrapper">
                                    <Controller
                                        name="rating"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                type="number"
                                                placeholder="rating"
                                                {...field}
                                                size="small"
                                                fullWidth

                                                error={error}
                                                label="rating"
                                                helperText={error && error.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="pricePerNight"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                type="number"
                                                placeholder="pricePerNight"
                                                {...field}
                                                size="small"
                                                fullWidth

                                                error={error}
                                                label="pricePerNight"
                                                helperText={error && error.message}
                                            />
                                        )}
                                    />

                                </div>



                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            type="text"
                                            placeholder="location"
                                            {...field}
                                            size="small"
                                            fullWidth

                                            error={error}
                                            label="location"
                                            helperText={error && error.message}
                                        />
                                    )}
                                />


                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            type="text"
                                            placeholder="address"
                                            {...field}
                                            size="small"
                                            fullWidth
                                            error={error}
                                            label="address"
                                            helperText={error && error.message}
                                        />
                                    )}
                                />

                                <div className="twoInputWrapper">
                                    <Controller
                                        name="beds"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                type="number"
                                                placeholder="beds"
                                                {...field}
                                                size="small"
                                                fullWidth

                                                error={error}
                                                label="beds"
                                                helperText={error && error.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="guests"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                type="number"
                                                placeholder="guests"
                                                {...field}
                                                size="small"
                                                fullWidth

                                                error={error}
                                                label="guests"
                                                helperText={error && error.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="twoInputWrapper">
                                    <Controller
                                        name="bathrooms"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                type="number"
                                                placeholder="bathrooms"
                                                {...field}
                                                size="small"
                                                fullWidth

                                                error={error}
                                                label="bathrooms"
                                                helperText={error && error.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="bedrooms"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                type="number"
                                                placeholder="bedrooms"
                                                {...field}
                                                size="small"
                                                fullWidth

                                                error={error}
                                                label="bedrooms"
                                                helperText={error && error.message}
                                            />
                                        )}
                                    />
                                </div>





                                <Controller
                                    name="amenities"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            type="text"
                                            placeholder="amenities"
                                            {...field}
                                            size="small"
                                            fullWidth

                                            error={error}
                                            label="amenities"
                                            helperText={error && error.message}
                                        />
                                    )}
                                />


                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data?.category}
                                        label="category"

                                    >
                                        <MenuItem value={"APARTMENT"}>APARTMENT</MenuItem>
                                        <MenuItem value={"HOUSE"}>HOUSE</MenuItem>
                                        <MenuItem value={"VILLA"}>VILLA</MenuItem>
                                        <MenuItem value={"CABIN"}>CABIN</MenuItem>
                                        <MenuItem value={"HOTEL"}>HOTEL</MenuItem>


                                    </Select>
                                </FormControl>


                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            type="text"
                                            placeholder="description"
                                            {...field}
                                            size="small"
                                            fullWidth

                                            error={error}
                                            label="description"
                                            helperText={error && error.message}
                                        />
                                    )}
                                />



                                <Controller
                                    name="isFeatured"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            type="checkbox"
                                            placeholder="isFeatured"
                                            {...field}
                                            size="small"
                                            fullWidth

                                            error={error}
                                            label="isFeatured"
                                            helperText={error && error.message}
                                        />
                                    )}
                                />




                                <Button variant="contained" loading={loading}
                                    onClick={handleSubmit(onSubmit)}>Create
                                </Button>

                                <Button variant="outlined"
                                    onClick={() => setModalOpen(false)} >Cancel
                                </Button>
                            </Stack>
                        </Paper>
                    </div>
                </div>
                : null
            }

            <div className="adminPageHeader">
               <Link to="/"><img src={logo} /></Link> 
                <Button onClick={() => setModalOpen(true)} variant="contained" color="error">
                    Create Apartman
                </Button>
            </div>

            <div className="listingSection">

                {error && <p style={{ color: "red" }}>{error.message}</p>}
                {loading && <div className="loadingWrapper"> <h2>Loading...</h2></div>}

                {data?.listings?.items?.map((item) => (

                    <div className="card" key={item.id}>
                        <IconButton className="favoriteBtn" onClick={() => {
                            addFavorite({ variables: { listingId: item.id } });

                        }}>
                            <FavoriteBorderIcon />
                            {/* {favorite ? (
                                <FavoriteIcon color="error" />
                            ) : (
                                
                            )} */}
                        </IconButton>


                        <Link style={{ textDecoration: "none" }} to={`/listingsInfo/${item.id}`}>
                            <img style={{ width: "181px", height: "181px", borderRadius: "30px" }}
                                src={item.images} alt="" />
                        </Link>

                        <small style={{ fontSize: "13px", width: "100%", color: "black" }}>{item.title}</small><br />
                        <small style={{ color: "grey" }}>${item.pricePerNight} for 2 night
                            <ion-icon name="star"></ion-icon> {item.rating}</small>
                    </div>



                ))}


            </div >
            <Footer />
        </>
    )
}

export default AdminPage