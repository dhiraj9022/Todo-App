import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddTodo from './Component/AddTodo'
import UpdateTodo from './Component/UpdateTodo'
import Page404 from './Page404'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <h1> Todo-App</h1>
       <Routes>
        <Route path='/' element ={<AddTodo />} />
        <Route path='/update/:id' element ={<UpdateTodo />} />
        <Route path='*' element ={<Page404 />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
