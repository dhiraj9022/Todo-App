import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

function UpdateTodo() {
    const { id } = useParams();
    const [completed, setCompleted] = useState(""); // Use a string to capture user input
    let navigate = useNavigate();

    async function updateTask(id) {
        console.warn(id);

        // Check if completed is a valid boolean value
        if (completed !== "true" && completed !== "false") {
            Swal.fire({
                title: "Try again!",
                text: 'Please enter status true or false',
                icon: "error",
            });
        } else {
            
                await fetch(
                    "https://private-anon-b5451113b0-fcctodoapp.apiary-mock.com/todos/"+id,
                    {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization":
                                "Basic eyJ1c2VyIjp7ImlkIjoyMTUxNjQsImVtYWlsIjoic3VwcG9ydEBzd2lwZXRhcHNlbGwuY29tIn0sImNvbnRleHQiOiJzdG9yZXMvOWoydHd0Z2QiLCJzdG9yZV9oYXNoIjoiOWoydHd0Z2QiLCJ0aW1lc3RhbXAiOjE0MzI5MDQ1MzAuMDg0NTQ3OH0=.YmI1MjI0M2Q1YWY4MGI5MTg2NDZkOTYwYzBkNTkxZjAzMzc2YTYxYjI2NTc5N2E1NjFlODhlMDE1ZjhjYzlkZA==",
                        },
                        body: JSON.stringify({ completed: completed === "true" }), // Convert the string to a boolean
                    }
                );
                    Swal.fire({
                        title: "Good Job!",
                        text: "Task updated successfully!! You will be redirected to the dashboard",
                        icon: "success",
                    });
                    console.warn("Task updated successfully...");
                    navigate("/");
               
            
        }
    }

    return (
        <>
            <TextField
                required
                id="outlined-basic"
                label="Update Completed Status"
                variant="outlined"
                onChange={(e) => setCompleted(e.target.value)}
            />
            <br />
            <br />
            <Button variant="contained" onClick={() => updateTask(id)}>
                Update
            </Button>
        </>
    );
}

export default UpdateTodo

