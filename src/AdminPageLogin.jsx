import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material"

import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useLogin } from "./useLogin"
import { useNavigate } from "react-router"

import { Link } from "react-router"
import { useAuth } from "./UseAuth"

const AdminLogin_MUTATION = gql`
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

const AdminLogin = () => {
    const navigate = useNavigate()
    const { setAccesToken, setUser } = useAuth()


    const { control, handleSubmit } = useForm({
        defaultValues: {  password: "", email: "" }
    })

    const [register, { data, loading }] = useMutation(AdminLogin_MUTATION,
         { onCompleted: () => { setAccesToken(data.accessToken); navigate("/admin") } })




    const handleLoginCompleted = (data) => {
        setAccesToken(data?.login?.accessToken);
        setUser(data?.user);
        toast.success("Admin Login succesfully!");
        navigate("/admin")
    }

    const handleAdminLoginPage = (values) => {
        console.log(values);
        register({
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
                            onClick={handleSubmit(handleAdminLoginPage)}>Admin sifatida kirish
                        </Button>

                    </Stack>
                </Paper>
            </Container>
        </>
    )
}

export default AdminLogin