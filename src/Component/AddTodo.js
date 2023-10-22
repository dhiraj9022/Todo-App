
import React, { useState } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GetListTodo from './GetListTodo';
import Swal from 'sweetalert2'


function AddTodo() {

    const [title, setTitle] = useState("")

    async function addTask() {
        console.warn(title);
        if(title === null || title.trim() === "" ){
            Swal.fire({  
                title: 'Try Again!',  
                text: 'Please enter task title',
                icon: 'error'
              }); 
        }
        else{
            
         fetch("http://private-anon-b5451113b0-fcctodoapp.apiary-mock.com/todos", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":"Basic eyJ1c2VyIjp7ImlkIjoyMTUxNjQsImVtYWlsIjoic3VwcG9ydEBzd2lwZXRhcHNlbGwuY29tIn0sImNvbnRleHQiOiJzdG9yZXMvOWoydHd0Z2QiLCJzdG9yZV9oYXNoIjoiOWoydHd0Z2QiLCJ0aW1lc3RhbXAiOjE0MzI5MDQ1MzAuMDg0NTQ3OH0=.YmI1MjI0M2Q1YWY4MGI5MTg2NDZkOTYwYzBkNTkxZjAzMzc2YTYxYjI2NTc5N2E1NjFlODhlMDE1ZjhjYzlkZA=="
            },
            body: JSON.stringify({
                title: ''
            })
        });
        
        console.warn("task added successfully....");
        Swal.fire({  
            title: 'Good Job!',  
            text: 'Task added successfully!!',
            icon: 'success'
          }); 
        }
    }

    return (
        <>
           
            <TextField required id="outlined-basic" label="add Title" variant="outlined" onChange={(e) => setTitle(e.target.value)} /> <br /><br />
            <Button variant="outlined" onClick={() => addTask()}>Add</Button>

            <br/><br/>
            <GetListTodo/>
        </>
    )
}

export default AddTodo