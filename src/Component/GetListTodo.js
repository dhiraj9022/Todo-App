import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

function GetListTodo() {
    const [listTodo, setListTodo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getListTodos();
    }, []);

    async function getListTodos() {
        try {
            let resp = await fetch("https://private-anon-b5451113b0-fcctodoapp.apiary-mock.com/todos");
            resp = await resp.json();
            setListTodo(resp);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    async function deleteTask(id) {
        console.warn(id);

        await fetch("https://private-anon-b5451113b0-fcctodoapp.apiary-mock.com/todos/" + id, {
            method: 'DELETE'
        });

        // Task fetching again
        getListTodos();

        Swal.fire({  
            title: 'Good Job!',  
            text: 'Task deleted successfully!!',
            icon: 'success'
          }); 
        console.log("Task deleted successfully");
    }

    function alertMessage(){
        Swal.fire({  
            title: 'Good Job!',  
            text: 'You will redirect to update page!!',
            icon: 'success'
          }); 
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" ><b>Id</b></TableCell>
                            <TableCell align="center"><b>Title</b></TableCell>
                            <TableCell align="center"><b>Completed</b></TableCell>
                            <TableCell align="center" colSpan={2}><b>Action</b></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : (
                            Array.isArray(listTodo) && listTodo.length > 0 ? (
                                listTodo.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center">{item.id}</TableCell>
                                        <TableCell align="center">{item.title}</TableCell>
                                        <TableCell align="center">{item.completed.toString()}</TableCell>
                                        <TableCell align="center"><Button variant="contained" onClick={() => deleteTask(item.id)}>Delete</Button></TableCell>
                                        <TableCell align="center"><Link to={"update/"+item.id} ><Button variant="contained" onClick={() => alertMessage()}>Update</Button></Link></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">No data available</TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default GetListTodo;