import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Weather from './Weather';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography, TextField, IconButton } from "@mui/material";
import { call, signout, account } from './service/ApiService';//추가
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './App.css'; // 스타일 파일 임포트


function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hideCompleted, setHideCompleted] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTodosByDate(selectedDate);
    }, [selectedDate]);

    const fetchTodosByDate = async (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        try {
            const response = await call(`/todo?todoDate=${formattedDate}`, "GET", null);
            setItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch todos:", error);
            setLoading(false);
        }
    };

    const add = async (item) => {
        item.todoDate = format(selectedDate, 'yyyy-MM-dd');
        try {
            await call("/todo", "POST", item);
            fetchTodosByDate(selectedDate);
        } catch (error) {
            console.error("Failed to add todo:", error);
        }
    };

    const deleteItem = async (item) => {
        try {
            await call("/todo", "DELETE", item);
            fetchTodosByDate(selectedDate);
        } catch (error) {
            console.error("Failed to delete todo:", error);
        }
    };

    const update = async (item) => {
        try {
            await call("/todo", "PUT", item);
            fetchTodosByDate(selectedDate);
        } catch (error) {
            console.error("Failed to update todo:", error);
        }
    };

    // //추가
    // const componentDidMount = async () => {
    //     try{
    //         await call("/todo", "GET", null);
    //         fetchTodosByDate(selectedDate);
    //     } catch (error) {
    //         console.error("Failed to update todo:", error);
    //     }
    // };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handlePrevDay = () => {
        setSelectedDate(prevDate => subDays(prevDate, 1));
    };

    const handleNextDay = () => {
        setSelectedDate(prevDate => addDays(prevDate, 1));
    };

    const toggleHideCompleted = () => {
        setHideCompleted(prevHideCompleted => !prevHideCompleted);
    };

    const todoItems = items
        .filter(item => !hideCompleted || !item.done)
        .map((item) => (
            <Todo item={item} key={item.id} delete={deleteItem} update={update} />
        ));

        const navigationBar = (
            <AppBar position="static">
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6">오늘의 할일</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Grid item>
                                    <Button color="inherit" onClick={account}>회원 정보</Button>
                                </Grid>
                                <Grid item>
                                    <Button color="inherit" onClick={signout}>로그아웃</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );

    const todoListPage = (
        <div>
            {navigationBar}
            <Container maxWidth="md">
                <Weather />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item>
                            <IconButton onClick={handlePrevDay}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <DatePicker
                                label="날짜 선택"
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleNextDay}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
                <AddTodo add={add} />
                <Button onClick={toggleHideCompleted}>
                    {hideCompleted ? "완료된 항목 보이기" : "완료된 항목 숨기기"}
                </Button>
                <div className="TodoList">
                    <Paper style={{ margin: 16 }}>
                        <List>
                            {todoItems}
                        </List>
                    </Paper>
                </div>
            </Container>
        </div>
    );

    const loadingPage = <h1>로딩중..</h1>;
    const content = loading ? loadingPage : todoListPage;

    return (
        <div className="App">
            {content}
        </div>
    );
}

export default App;
