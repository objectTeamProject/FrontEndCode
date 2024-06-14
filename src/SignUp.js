// import React from "react";
// import {
//     Button,
//     TextField,
//     Link,
//     Grid,
//     Container,
//     Typography,
// } from "@mui/material";

// import { signup } from "./service/ApiService";

// class SignUp extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(event) {
//         event.preventDefault();

//         const data = new FormData(event.target);
//         const username = data.get("username");
//         const email = data.get("email");
//         const password = data.get("password");
//         signup({ email: email, username: username, password: password }).then(
//             (response) => {
//                 window.location.href = "/login";
//             }
//         );
//     }

//     render() {
//         return (
//             <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
//                 <form noValidate onSubmit={this.handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <Typography component="h1" variant="h5">
//                                 계정 생성
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 autoComplete="username"
//                                 name="username"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="username"
//                                 label="사용자 이름"
//                                 autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 autoComplete="email"
//                                 name="email"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="이메일 주소"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 autoComplete="current-password"
//                                 name="password"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="password"
//                                 label="패스워드"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 color="primary"
//                             >
//                                 계정 생성
//                             </Button>
//                         </Grid>
//                     </Grid>
//                     <Grid container justifyContent="flex-end">
//                         <Grid item>
//                             <Link href="/login" variant="body2">
//                                 이미 계정이 있습니까? 로그인 하세요.
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Container>
//         );
//     }
// }

// export default SignUp;

import React from "react";
import {
    Button,
    TextField,
    Link,
    Grid,
    Container,
    Typography,
    Snackbar,
} from "@mui/material";
import { signup } from "./service/ApiService";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            username: '',
            email: '',
            passwordError: false,
            errorMessage: '',
            snackbarOpen: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleCloseSnackbar() {
        this.setState({ snackbarOpen: false });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { username, email, password, confirmPassword } = this.state;

        if (!username || !email || !password || !confirmPassword) {
            this.setState({
                errorMessage: '모든 필드를 입력해주세요.',
                snackbarOpen: true,
            });
            return;
        }

        if (password !== confirmPassword) {
            this.setState({
                passwordError: true,
                errorMessage: '패스워드가 일치하지 않습니다.',
                snackbarOpen: true,
            });
            return;
        } else {
            this.setState({ passwordError: false });
        }

        signup({ email: email, username: username, password: password })
            .then((response) => {
                window.location.href = "/login";
            })
            .catch((error) => {
                let errorMessage = "회원가입 실패";
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
                this.setState({
                    errorMessage: errorMessage,
                    snackbarOpen: true,
                });
            });
    }

    render() {
        const { username, email, password, confirmPassword, passwordError, errorMessage, snackbarOpen } = this.state;

        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                계정 생성
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="사용자 이름"
                                autoFocus
                                value={username}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                value={email}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="current-password"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                                type="password"
                                value={password}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="confirm-password"
                                name="confirmPassword"
                                variant="outlined"
                                required
                                fullWidth
                                id="confirmPassword"
                                label="패스워드 확인"
                                type="password"
                                value={confirmPassword}
                                onChange={this.handleInputChange}
                                error={passwordError}
                                helperText={passwordError ? "패스워드가 일치하지 않습니다." : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                계정 생성
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있습니까? 로그인 하세요.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackbar}
                    message={errorMessage}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
            </Container>
        );
    }
}

export default SignUp;
