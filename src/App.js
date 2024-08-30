import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import Singal from './pages/Singal';
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
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
    <div className=" h-auto overflow-x-hidden filter backdrop:blur-md">
      <Provider store={store}>
      <RouterProvider router = {router} />
      </Provider>
    </div>
  );
}

export default App;
