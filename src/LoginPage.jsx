import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material"

import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useLogin } from "./useLogin"
import { useNavigate } from "react-router"

import { Link } from "react-router"

const Login_MUTATION = gql`
        mutation login($email:String!, $password:String!){
            login(email: $email, password: $password){
                accessToken
                user{
                    id
                    email
                }
        }
        }
        
    `

const LoginPage = () => {
    const navigate = useNavigate()
    const { setAccesToken, setUser } = useLogin()


    const { control, handleSubmit } = useForm({
        defaultValues: { name: "", password: "", email: "" }
    })

    const [login, { loading}] = useMutation(Login_MUTATION)




    const handleLoginCompleted = (data) => {


        setAccesToken(data?.login?.accessToken);
        setUser(data?.login?.user);
        toast.success("Login succesfully!");
        navigate(-1)
    }

    const handleLoginPage = (values) => {
        console.log(values);

        login({
            variables: values,
            onCompleted: handleLoginCompleted,
            onError: (error) => toast.error(error.message)
        });
    }
    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={20} style={{ padding: 20, marginTop: 300 }}>
                    <Stack spacing={3}>
                        <Typography variant="h3" style={{ marginLeft: "180px" }}>Log In</Typography>
                    


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
                            onClick={handleSubmit(handleLoginPage)}>Kirish
                        </Button>

                        <p style={{marginLeft: "180px"}}>Already you have Account ?  <Link to="/register">Sign Up</Link></p>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
}

export default LoginPage