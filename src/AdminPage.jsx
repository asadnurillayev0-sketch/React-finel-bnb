import {
    Button, Container,
    FormControl, Grid,
    IconButton,
    InputLabel, MenuItem,
    Paper, Select, Stack,
    TextField, Typography,

} from "@mui/material";


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import logo from './assets/Logo.svg';
import Footer from "./FooterSection";
import { Link, Navigate } from "react-router";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import AdminLogin from "./AdminPageLogin";
import { Atom } from "react-loading-indicators";
import FavoriteIcon from '@mui/icons-material/Favorite';

const AdminPage = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const [favorites, setFavorites] = useState([]);






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
             bedrooms: "", bathrooms: "", isFeatured: false
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
        console.log(data.category)
    }







    const handleFavoriteClick = (id) => {
        setFavorites(item =>
            item.includes(id)
                ? item.filter(item => item !== id)
                : [...item, id]
        );
    };


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

                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos reyting kiriting",
                                            },
                                            max: {
                                                value: 5,
                                                message: "Reyting 5dan katta bolmasligi kerak"
                                            },
                                            min: {
                                                value: 1,
                                                message: "Reyting 1dan kam bolmasligi kerak"
                                            }

                                        }}
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
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos joy kiriting",
                                            }
                                        }}
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

                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Iltimos joy locatsiyasini kiriting",
                                        }
                                    }}
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
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Iltimos joy manzilini kiriting",
                                        }
                                    }}
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
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos yotoqlar sonini kiriting",
                                            }
                                        }}
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
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos mehmonlar sonini kiriting",
                                            }
                                        }}
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

                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos yuvinish xonalari sonini kiriting",
                                            }
                                        }}
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
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Iltimos yotoqxonalar sonini kiriting",
                                            }
                                        }}
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
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Iltimos qulaylik turlarini kiriting",
                                        }
                                    }}
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
 <Controller
                                    name="category"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Iltimos kategoriya turlarini kiriting",
                                        }
                                    }}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (

                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select 
                                          {...field}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="category"

                                    >
                                        <MenuItem value={"APARTMENT"}>APARTMENT</MenuItem>
                                        <MenuItem value={"HOUSE"}>HOUSE</MenuItem>
                                        <MenuItem value={"VILLA"}>VILLA</MenuItem>
                                        <MenuItem value={"CABIN"}>CABIN</MenuItem>
                                        <MenuItem value={"HOTEL"}>HOTEL</MenuItem>


                                    </Select>
                                </FormControl>)}
                                />


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
                                           
                                            {...field}
                                            size="small"
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







            <Grid sx={{ xs: { maxWidth: "400px" } }} container spacing={1} className="listingSection">
                {error && <p style={{ color: "red" }}>{error.message}</p>}
                {loading && <div className="loadingWrapper">
                    <Atom color="#cc3131" size="large" text="" textColor="" />
                </div>}

                {data?.listings?.items?.map((item) => (
                    <Grid className="card" key={item.id}>

                        <IconButton

                            className="favoriteBtn"
                            onClick={() => {
                                handleFavoriteClick(item.id);
                                addFavorite({ variables: { listingId: item.id } });
                            }}
                        >

                            {favorites.includes(item.id) ? (
                                <FavoriteIcon color="error" />
                            ) : (
                                <FavoriteBorderIcon color="error" />
                            )}
                        </IconButton>

                        <Link style={{ textDecoration: "none" }} to={`/listingsInfo/${item.id}`}>
                            <img src={item.images} />
                        </Link>

                        <Typography variant="subtitle1" >
                            {item.title.slice(0, 18)}
                        </Typography><br />
                        <Typography variant="caption" style={{ color: "grey", }}>
                            ${item.pricePerNight} for 2 night
                            <ion-icon name="star"></ion-icon> {item.rating}
                        </Typography>
                    </ Grid>
                ))}
            </Grid>


            <Footer />
        </>
    )
}

export default AdminPage