import React from "react";
import { getUserInfo, delaccount } from "./service/ApiService";
import { Button, Grid, Container, Typography, Box, Paper } from "@material-ui/core";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: ""
        };
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }

    componentDidMount() {
        getUserInfo().then(response => {
            this.setState({
                email: response.email,
                username: response.username
            });
        }).catch(error => {
            console.error("사용자 정보를 가져오는데 실패했습니다:", error);
            alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
        });
    }

    handleDeleteAccount() {
        delaccount().then(response => {
            if (response.message === "User deleted successfully") {
                console.log("회원 탈퇴 성공:", response);
                window.location.href = "/login";
            } else {
                alert("회원 탈퇴에 실패했습니다. 서버 응답: " + JSON.stringify(response));
            }
        }).catch(error => {
            console.error("회원 탈퇴 실패:", error);
            alert("회원 탈퇴 중 오류가 발생했습니다. 오류: " + error.toString());
        });
    }

    render() {
        const { email, username } = this.state;
        const boxWidth = "80%";

        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
                        회원 정보
                    </Typography>
                    <Box mt={4} width={boxWidth}>
                        <Grid container spacing={1} direction="column" alignItems="center">
                            <Grid item xs={12} style={{ width: "100%" }}>
                                <Paper elevation={3} style={{ padding: "15px" }}>
                                    <Typography variant="body1" style={{ whiteSpace: "pre" }}>
                                        <span style={{ fontWeight: 'bold' }}>이메일</span>  |  {email}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} style={{ width: "100%" }}>
                                <Paper elevation={3} style={{ padding: "15px" }}>
                                    <Typography variant="body1" style={{ whiteSpace: "pre" }}>
                                        <span style={{ fontWeight: 'bold' }}>이   름</span>  |  {username}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={3} width={boxWidth}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={this.handleDeleteAccount}
                        >
                            회원 탈퇴
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
        
        
    }
}

export default Account;
