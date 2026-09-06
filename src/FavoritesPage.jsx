
import { gql } from "@apollo/client"
import Footer from "./FooterSection"
import Header from "./Header"
import { useMutation, useQuery } from "@apollo/client/react"
import { Link } from "react-router"
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Typography } from "@mui/material"
import { Atom } from "react-loading-indicators"


const FavoritesPage = () => {
    
    const RemoveQuery = gql`
    mutation Mutation($listingId: ID!) {
  removeFavorite(listingId: $listingId) {
    id
}}
`


    const Favorites = gql`
query Favorites {
  favorites {
  rating
    address
  pricePerNight
    id
    images
    title
  }
}

`
    const [removeFavorite] = useMutation(RemoveQuery);


    const { data, refetch,error,loading } = useQuery(Favorites, {
        variables: {}
    })
    console.log(data?.favorite);


    return (
        <>
            <Header />


       <Grid sx={{ xs: { maxWidth: "400px" } }} container spacing={1} className="listingSection">
                {error && <p style={{ color: "red" }}>{error.message}</p>}
                {loading && <div className="loadingWrapper">
                    <Atom color="#cc3131" size="large" text="" textColor="" />
                </div>}

                {data?.favorites?.map((item) => (
                    <Grid className="card" key={item.id}>
                        
                        <IconButton className="removeFavoriteIcon" onClick={() => {
                            removeFavorite({ variables: { listingId: item.id } });
                            refetch()
                        }}>
                            <CloseIcon color="error" className="removeFavoriteIcon" />
                        </IconButton>

                        <Link style={{ textDecoration: "none" }} to={`/listingsInfo/${item.id}`}>
                            <img src={item.images}/>
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
            </Grid>  <br /><br /><br />
            <Footer />
        </>
    )
}
export default FavoritesPage