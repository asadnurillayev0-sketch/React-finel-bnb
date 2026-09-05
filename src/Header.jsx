import logo from './assets/Logo.svg';
import {
    Button, FormControl, IconButton,
    InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import { Link } from "react-router";
import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useAuth } from "./UseAuth"
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import { useLogin } from './useLogin';

const ListingHeader = gql`
             query ListingHeader($search:String ) {
             listings( search: $search){
                items{
                    id
                    title
                    images
                }
                   
             } 
            }
        `;

const Header = ({ search, setSearch, category,
    setCategory, maxPrice, setMaxPrice,
    minPrice, setMinPrice }) => {


    console.log(minPrice);


    const navigate = useNavigate()
    const { user, } = useAuth();
    const { accessToken, logOut } = useLogin()








    const userAvatar = user?.name
        ? user.name.charAt(0).toUpperCase()
        : "?";

    const { data, } = useQuery(ListingHeader)


    const a = []
    console.log(a.length);


    const logOutBtn = () => {
        logOut()
        localStorage.clear()
        console.log(accessToken);
        navigate("/login")


    }

    return (
        <>
            <div className="header" >

                <Link to="/"><img src={logo} className='logo' /></Link>

                <div className='searchWrapper'>
                    <input value={search} type="search" onChange={(e) => setSearch(e.target.value)} />
                    <button className="searchBtn">
                        <ion-icon name="search-outline"></ion-icon></button>
                </div>


                <div className='headerBtnWrapper'>

                    {accessToken?.length > 0 ? (
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

                            <IconButton onClick={logOutBtn}>
                                <LogoutIcon color='error' />
                            </IconButton>
                        </div>
                    ) :
                        (




                            <div className='signBtnWrapper'>
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




                <div className='filterWrapper'>
                    {/* <FormControl className='categoryFilter'>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="category"
                            onChange={(e) => setCategory(e?.target?.value)}

                        >
                            <MenuItem value={"APARTMENT"}>APARTMENT</MenuItem>
                            <MenuItem value={"HOUSE"}>HOUSE</MenuItem>
                            <MenuItem value={"VILLA"}>VILLA</MenuItem>
                            <MenuItem value={"CABIN"}>CABIN</MenuItem>
                            <MenuItem value={"HOTEL"}>HOTEL</MenuItem>


                        </Select>
                    </FormControl> */}


                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e?.target?.value)}
                        >
                            <MenuItem value={"APARTMENT"}>APARTMENT</MenuItem>
                            <MenuItem value={"HOUSE"}>HOUSE</MenuItem>
                            <MenuItem value={"VILLA"}>VILLA</MenuItem>
                            <MenuItem value={"CABIN"}>CABIN</MenuItem>
                            <MenuItem value={"HOTEL"}>HOTEL</MenuItem>
                        </Select>
                    </FormControl>



                    <TextField
                        className="PriceFilterInput"
                        type="number"
                        placeholder="maxPrice"
                        size="small"
                        fullWidth
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        label="maxPrice"

                    />






                    <TextField
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="PriceFilterInput"
                        type="number"
                        placeholder="minPrice"

                        size="small"
                        value={minPrice}
                        fullWidth
                        label="minPrice"
                    />


                </div>


                {/* <Button onClick={() => refetch()}>Refresh</Button> */}

            </div>
        </>
    )
}

export default Header