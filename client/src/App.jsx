import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import "./App.css";
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Register from './pages/Register'
import MyBlogs from './pages/MyBlogs'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'


function App() {



  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/myBlogs' element={<MyBlogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Login />} />


      </Routes>
    </>
  )
}

export default App;


// 7 - 12:00