
import { gql } from "@apollo/client"
import Footer from "./FooterSection"
import Header from "./Header"
import { useMutation, useQuery } from "@apollo/client/react"
import { Link } from "react-router"
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material"


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


    const { data, refetch } = useQuery(Favorites, {
        variables: {}
    })
    console.log(data?.favorite);


    return (
        <>
            <Header />
            <div className="listingSection">
                {data?.favorites?.map((item) => (
                    <div className="card" key={item.id}>
                        <IconButton className="removeFavoriiteIcon" onClick={() => {
                            removeFavorite({ variables: { listingId: item.id } });
                            refetch()
                        }}>
                            <CloseIcon className="removeFavoriiteIcon" />
                        </IconButton>

                        <Link style={{ textDecoration: "none" }} to={`/listingsInfo/${item.id}`}>
                            <img style={{ width: "181px", height: "181px", borderRadius: "30px" }}
                                src={item.images} alt="" />
                        </Link>

                        <small style={{ fontSize: "13px", width: "100%", color: "black" }}>{item.title}</small><br />
                        <small style={{ color: "grey" }}>${item.pricePerNight} for 2 night
                            <ion-icon name="star"></ion-icon> {item.rating}</small>
                    </div>
                ))

                }

            </div><br /><br /><br />
            <Footer />
        </>
    )
}
export default FavoritesPage