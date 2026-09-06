import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { Grid, IconButton, Pagination, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { Link } from "react-router"; 
import Footer from "./FooterSection";
import Header from "./Header";
import { Atom } from "react-loading-indicators";
const AddQuery = gql`
    mutation AddFavorite($listingId: ID!) {
        addFavorite(listingId: $listingId) {
            id
            title
            rating
            address
            pricePerNight
            images
        }
    }
`;

const ListingQuery = gql`
    query Listings($category: ListingCategory, $search: String, $minPrice: Int, $maxPrice: Int,$limit: Int, $page: Int) {
listings(category: $category, search: $search, minPrice: $minPrice, maxPrice: $maxPrice, page: $page, limit: $limit) {
            items {
                id
                title
                pricePerNight
                images
                rating
            }
            pagination {
                totalPages
            }
        } 
    }
`;

const Listings = () => {
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState(null)

    console.log(category);

    const [maxPrice, setMaxPrice] = useState()
    const [minPrice, setMinPrice] = useState()


   

    const { data, loading, error } = useQuery(ListingQuery, {
        variables: {
            limit: 20, page: page, search: search, category: category,
            maxPrice: maxPrice, minPrice: minPrice
        }
    });

    const [addFavorite] = useMutation(AddQuery);

    const totalPages = data?.listings?.pagination?.totalPages || 1;

 const [favorites, setFavorites] = useState([]);
    const handleFavoriteClick = (id) => {
        setFavorites(item =>
            item.includes(id)
                ? item.filter(item => item !== id)
                : [...item, id]
        );
    };


    return (
        <>
            <Header search={search} setSearch={setSearch} category={category}
                setCategory={setCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                minPrice={minPrice} setMinPrice={setMinPrice} />

            <Grid sx={{ xs: { maxWidth: "400px" } }} container spacing={1} className="listingSection">
                {error && <p style={{ color: "red" }}>{error.message}</p>}
                {loading && <div className="loadingWrapper">
                    <Atom color="#cc3131" size="large" text="" textColor="" />
                </div>}

                {data?.listings?.items?.map((item) => (
                    <Grid className="card" key={item.id}>
                        <small className="guestFavoriteText">Guest favorite</small>
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


            <div className="paginationWrapper">
                <Pagination
                    page={page}
                    count={totalPages}
                    showFirstButton
                    showLastButton
                    onChange={(event, value) => setPage(value)}
                />
            </div>
            <Footer />
        </>
    );
};

export default Listings;