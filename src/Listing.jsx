import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { IconButton, Typography, Button } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Link } from "react-router";



import Footer from "./FooterSection";
import Header from "./Header";

const Listings = () => {

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")


    const addQuery = gql`
     mutation addFavorites($listingId: ID!) {
       addFavorite(listingId: $listingId) {
      id
    }
  }
`;

    const Listing = gql`
         query Listing($limit:Int, $page:Int, $search: String) {
         listings(limit: $limit,page: $page, search: $search ){
            items{
                id
                title
                pricePerNight
                images
                rating
               
                
            }
                pagination{
                 totalPages
                
                }
         } 
        }
    `;
    const { data, loading, error, refetch } = useQuery(Listing, {
        variables: { limit: 20, page, search: search }
    })

    console.log(data?.listings?.pagination);
    const totalPages = data?.listings?.pagination?.totalPages

    const [addFavorite] = useMutation(addQuery);
    const [favorite, setFavorite] = useState(false)
    return (
        <>



            <Header />

            <div className="listingSection">

                {/* <p>Popular homes in Dubai</p>
                <span className="arrowIcon"><ion-icon name="arrow-forward-outline"></ion-icon></span> */}
                {error && <p style={{ color: "red" }}>{error.message}</p>}
                {loading && <div className="loadingWrapper"> <h2>Loading...</h2></div>}

                {data?.listings?.items?.map((item) => (

                    <div className="card" key={item.id}>

                        <IconButton className="favoriteBtn" onClick={() => {
                            addFavorite({ variables: { listingId: item.id } });
                            setFavorite(prev => !prev);
                        }}

                        >
                            {favorite ? (
                                <FavoriteIcon color="error" />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
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

            {
                new Array(totalPages).fill("").map((_, index) => (
                    <button onClick={() => setPage(index + 1)}>{index + 1}</button>
                ))
            }


            < Footer />
        </>

    )
}

export default Listings