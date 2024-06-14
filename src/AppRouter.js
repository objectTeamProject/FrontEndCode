import React from "react";
import Typography from "@mui/material/Typography";
import App from "./App";
import Login from "./Login";
import Del_account from "./Del_account";///추가
import Account from "./Account";//추가
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import "./index.css";
import SignUp from "./SignUp";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright ⓒ "}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render() {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");////추가
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/app" element={<App />} />
                        {/* 추가 */}
                        <Route path="/account" element={<Account />} />
                        <Route path="/delaccount" element={<Del_account />} />
                        {/* 추가 */}
                        <Route 
                            path="/" 
                            element={accessToken ? <Navigate to="/app" replace /> : <Navigate to="/login" replace />}
                        />
                    </Routes>
                </div>
                <div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </BrowserRouter>
        );
    }
}
export default AppRouter;