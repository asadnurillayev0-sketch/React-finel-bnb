import { Button, Grid, IconButton, Typography } from "@mui/material"
import { Link } from "react-router"
import logo from './assets/Logo.svg';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Atom } from "react-loading-indicators";


const Home = () => {
    const FeaturedListings = gql`
    query FeaturedListings {
  featuredListings {
    address
    title
    images
    rating
    pricePerNight
  }
}
`

    const { data, error, loading } = useQuery(FeaturedListings)
    return (
        <>

            {loading && <div className="loadingWrapper"> <h2>Loading...</h2></div>}
            <div className="homeHeader">
                <Link>  <img className="homeLogo" src={logo} /></Link>
                <Button variant="contained" color="error"><Link style={{ textDecoration: "none", color: 'aliceblue' }} to="/listings">See all homes </Link></Button>
            </div>

            <div className="homeCardWrapper">
                {loading && <div className="loadingWrapper">
                    <Atom color="#cc3131" size="large" text="" textColor="" />
                </div>}
                
                    <Grid sx={{ xs: { maxWidth: "400px" } }} container spacing={1} className="listingSection">
                        {error && <p style={{ color: "red" }}>{error.message}</p>}
                        {loading && <div className="loadingWrapper">
                            <Atom color="#cc3131" size="large" text="" textColor="" />
                        </div>}

                        {data?.featuredListings?.map((item) => (
                            <Grid className="card" key={item.id}>
                                <Link style={{ textDecoration: "none" }} to={`/listingsInfo/${item.id}`}>
                                    <img src={item.images} />
                                </Link>

                                <Typography variant="subtitle1" >
                                    {item.title.slice(0,18)}
                                </Typography><br />
                                <Typography variant="caption" style={{ color: "grey", }}>
                                    ${item.pricePerNight} for 2 night
                                    <ion-icon name="star"></ion-icon> {item.rating}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {item.adress}
                                </Typography>
                            </ Grid>
                        ))}
                    </Grid>
               
            </div>


        </>
    )
}

export default Home