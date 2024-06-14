import React from "react";
import { signin } from "./service/ApiService";
import { Button, TextField, Grid, Link, Container, Typography, Snackbar } from "@mui/material";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            open: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        const message = localStorage.getItem("message");
        if (message) {
            this.setState({ message: message, open: true });
            localStorage.removeItem("message");
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");

        signin({ email: email, password: password })
            .then((response) => {
                window.location.href = "/";
            })
            .catch((error) => {
                let errorMessage = "다시 입력하세요";
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
                this.setState({
                    message: errorMessage,
                    open: true,
                });
            });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <Grid container spacing={2}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                                name="password"
                                autoComplete="password"
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                로그인
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="/signup" variant="body2">
                                계정이 없습니까? 여기서 가입하세요.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={this.state.message}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
            </Container>
        );
    }
}

export default Login;

