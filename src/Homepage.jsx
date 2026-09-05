import { Button } from "@mui/material"
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
    isFavorite
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
                {data?.featuredListings?.map((item) => (
                    <div className="card" key={item.id}>
                        <Link style={{ textDecoration: "none" }} to={`/listingsInfo/${item.id}`}>
                            <img style={{ width: "181px", height: "181px", borderRadius: "30px" }}
                                src={item.images} alt="" />
                        </Link>
                        <small style={{ fontSize: "13px", width: "100%", color: "black" }}>{item.title}</small><br />
                        <small style={{ color: "grey" }}>${item.pricePerNight} for 2 night
                            <ion-icon name="star"></ion-icon> {item.rating}
                        </small>

                    </div>

                ))}
            </div>


        </>
    )
}

export default Home