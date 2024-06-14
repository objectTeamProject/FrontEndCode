import React from "react";
import {
    Button,
    Grid,
    Container,
    Typography,
} from "@mui/material";

import { delaccount } from "./service/ApiService";

class DelAccount extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        delaccount().then((response) => {
            if (response.message === "User deleted successfully") {
                console.log("회원 탈퇴 성공:", response);
                localStorage.setItem("message", "회원 탈퇴가 성공적으로 완료되었습니다.");
                window.location.href = "/login";
            } else {
                console.error("회원 탈퇴 실패:", response);
                localStorage.setItem("message", "회원 탈퇴에 실패했습니다.");
                window.location.href = "/login";
            }
        }).catch((error) => {
            console.error("회원 탈퇴 실패:", error.toString());
            localStorage.setItem("message", "회원 탈퇴 중 오류가 발생했습니다.");
            window.location.href = "/login";
        });
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                회원 탈퇴
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            회원 탈퇴
                        </Button>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default DelAccount;
