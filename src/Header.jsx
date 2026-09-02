import logo from './assets/Logo.svg';
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router";
import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useAuth } from "./UseAuth"
import LogoutIcon from '@mui/icons-material/Logout';


const ListingHeader = gql`
             query ListingHeader($search:String ) {
             listings( search: $search){
                items{
                    id
                    title
                    image
                }
                   
             } 
            }
        `;

const Header = () => {
    const [search, setSearch] = useState("")



    const { accessToken, user, logOut } = useAuth();


    const userAvatar = user?.name
        ? user.name.charAt(0).toUpperCase()
        : "?";

    const { data } = useQuery(ListingHeader, {
        variables: { search: search }
    })


    const logOutBtn = () => {
        

        localStorage.clear()
        logOut()
    }
    return (
        <>
            <div className="header" >

                <img className="logo" src={logo} alt="" />

                <input type="search" onChange={(e) => setSearch(e.target.value)} />
                <button className="searchBtn" style={{ marginLeft: !accessToken ? "40px" : "0px" }}><ion-icon name="search-outline"></ion-icon></button>

                <div className='headerBtnWrapper'>
                    {!accessToken ? (
                        <div className='btns'>

                            <Button color="error"
                                variant="contained"><Link style={{ textDecoration: "none", color: "aliceblue" }}
                                    to="/favorites">Favorites</Link>
                            </Button>

                            <Button color="error"
                                variant="contained"><Link style={{ textDecoration: "none", color: "aliceblue" }}
                                    to="/bookings">Bookings</Link>
                            </Button>

                            <div className='avatarImg'>
                                <h3>{userAvatar}</h3>
                            </div>
                            <p onClick={() => logOutBtn()}>Log out</p>
                            <IconButton onClick={() => logOutBtn()}>
                                <LogoutIcon color='error' />
                            </IconButton>
                        </div>
                    ) :


                        (

                            <div>
                                <Button color="error"
                                    variant="contained"><Link style={{ textDecoration: "none", color: "aliceblue" }}
                                        to="/register">Sign Up</Link>

                                </Button>

                                <Button color="error"
                                    variant="contained"><Link style={{ textDecoration: "none", color: "aliceblue" }}
                                        to="/login">Login</Link>

                                </Button>


                            </div>

                        )
                    }

                </div>


                {/* <Button onClick={() => refetch()}>Refresh</Button> */}

            </div>
        </>
    )
}

export default Header