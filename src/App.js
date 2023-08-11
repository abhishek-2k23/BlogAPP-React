import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import Singal from './pages/Singal';
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom";
const Layout = ()=>{
  return (<>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
  </>)
  
}
const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        path : "/",
        element : <Home></Home>
      },
      {
        path : "/write",
        element: <Write/>
      },
      {
        path : "/post/:id",
        element : <Singal/>
      }
    ]
  },
  {
    path : "/Login",
    element : <Login></Login>
  },
  {
    path : "/register",
    element : <Register></Register>
  }
])
function App() {
  return (
    <div className=" h-auto overflow-x-hidden filter backdrop:blur-md ">
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
