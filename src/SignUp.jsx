import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material"

import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useAuth } from "./UseAuth"
import { useNavigate } from "react-router"

import { Link } from "react-router"

const REGISTER_MUTATION = gql`
        mutation Register($email:String!, $password:String!, $name:String!){
            register(email: $email, password: $password, name: $name){
                accessToken
                user{
                    id
                    email
                    name 
                }
        }
        }
        
    `

const SignUp = () => {
    const navigate = useNavigate()
    const { setAccesToken, setUser } = useAuth()


    const { control, handleSubmit } = useForm({
        defaultValues: { name: "", password: "", email: "" }
    })

    const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION)




    const handleRegisterCompleted = (data) => {


        setAccesToken(data?.register.accessToken);
        setUser(data?.register?.user);
        toast.success("Registered succesfully!");
        navigate(-1)
    }

    const handleSignUp = (values) => {
        console.log(values);

        register({
            variables: values,
            onCompleted: handleRegisterCompleted,
            onError: (error) => toast.error(error.message)
        });
    }
    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={20} style={{ padding: 20, marginTop: 300 }}>
                    <Stack spacing={3}>
                        <Typography variant="h3" style={{ marginLeft: "180px" }}>Sign Up</Typography>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Iltimos Ismingizni kiriting",
                                        }
                                    }}

                                    placeholder="Name"
                                    {...field}
                                    size="small"
                                    fullWidth
                                    error={error}
                                    label="Name"
                                    helperText={error && error.message}
                                />
                            )}
                        />



                        <Controller
                            name="email"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Iltimos Emailni kiriting",
                                }
                            }}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    type="email"
                                    placeholder="Email"
                                    {...field}
                                    size="small"
                                    fullWidth
                                    error={error}
                                    label="Email"
                                    helperText={error && error.message}
                                />
                            )}
                        />


                        <Controller
                            name="password"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Iltimos Parolni kiriting",
                                },
                                min: {
                                    value: 6,
                                    message: "Parol 6ta belgidan ko'p bolishi kerak",
                                }
                            }}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    size="small"
                                    fullWidth

                                    error={error}
                                    label="Password"
                                    helperText={error && error.message}
                                />
                            )}
                        />


                        <Button variant="contained" loading={loading}
                            onClick={handleSubmit(handleSignUp)}>Sign Up
                        </Button>

                        <p style={{marginLeft: "180px"}}>Already you have Account ?  <Link to="/login">Sign In</Link></p>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
}

export default SignUp