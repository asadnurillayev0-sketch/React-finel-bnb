import { gql } from "@apollo/client"
import Footer from "./FooterSection"
import Header from "./Header"
import { useMutation, useQuery } from "@apollo/client/react"
import { Button } from "@mui/material"

const BookingsPage = () => {

    const Bookings = gql`
        query Bookings {
     bookings {
        checkIn
        checkOut
        guests
        status
        totalNights
        totalPrice
        id

           listing {
             images
                
             location
             title
    }  
  }
}
    `

    const removeBooking = gql`
        mutation Mutation($bookingId: ID!) {
       cancelBooking(bookingId: $bookingId) {
    id
  }
}
    `
 const [removeBookingBtn] = useMutation(removeBooking);



    const { data, refetch} = useQuery(Bookings, {
        variables: {}
    })

    console.log(data?.listing)
    return (
        <>
            <Header />
            <div className="bookingsWrapper">
                {data?.bookings?.map((item) => (
                    <div>
                        <img src={item.listing.images} alt="" />
                        <h3>{item.listing.title}</h3>
                        <p>{item.listing.location}</p>

                        <p><b style={{ fontSize: "18px" }}>checkIn:</b> {item.checkIn} </p>
                        <p><b style={{ fontSize: "18px" }}>checkOut:</b> {item.checkOut} </p>
                        <p><b style={{ fontSize: "18px" }}>guests:</b> {item.guests}</p>
                        <p><b style={{ fontSize: "18px" }}>totalNights:</b>  {item.totalNights} </p>
                        <p><b style={{ fontSize: "18px" }}>totalPrice:</b> {item.totalPrice} $</p>
                        <p><b style={{ fontSize: "18px" }}>State:</b> {item.status}</p><br />
                        <Button style={{ marginTop: "auto" }} color="error"
                         variant="contained" onClick={() => {
                            removeBookingBtn({ variables: { bookingId: item.id } });
                           refetch()
                        }}>Cancel
                        </Button>
                    </div>
                ))}
            </div>
            <Footer />


        </>
    )
}

export default BookingsPage