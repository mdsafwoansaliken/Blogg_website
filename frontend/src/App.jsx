
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/UserContext'
import MyBlogs from './pages/MyBlogs'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


const App = () => {
  return (
    <BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/write" element={<CreatePost/>}/>
        <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
        <Route exact path="/edit/:id" element={<EditPost/>}/>
        <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
        <Route exact path="/profile/:id" element={<Profile/>}/>
        <Route exact path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route exact path="/resetPassword/:id/:token" element={<ResetPassword/>}/>
      </Routes>
      </UserContextProvider>
      </BrowserRouter>
  )
}

export default App
