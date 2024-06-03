import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from "./pages/contact";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { useEffect, useState } from "react";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doLGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import NotPermited from "./components/ProtectedRoute/NotPermited";
import LayoutAdmin from "./pages/admin/LayoutAdmin";
import './styles/reset.scss'
import BookTable from "./pages/book/BookTable";
import BookPage from "./pages/book/BookPage";
import './styles/global.scss'
import ViewOrder from "./components/Order/ViewOrder";
import Payment from "./components/Order/Payment";
import OrderPage from "./pages/order";
import ResultPage from "./components/Order/Result";
import AdminPage from "./pages/admin/Dashboard";
import HistoryOrder from "./components/Order/HistoryOrder";
const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="layout-app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Outlet context={[searchTerm, setSearchTerm]}/>
      <Footer/>
    </div>
  )
}

// const LayoutAdmin = () => {
//   const isAdminRoute = window.location.pathname.startsWith('/admin');
//   const user = useSelector(state => state.account.user);
//   const userRole = user.role;
//   return (
//     <div className="layout-app">
//       {/* <Header/> */}
//       {isAdminRoute && user.role === 'ADMIN' && <Header/>}
//       <Outlet/>
//       {isAdminRoute && user.role === 'ADMIN' && <Footer/>}
//       {/* <Footer/> */}
//     </div>
//   )
// }
export default function App() {
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.account.isLoading)

  const getAcount = async () => {
      if(window.location.pathname ==='/login'
        ||window.location.pathname ==='/register'
      ) return;
      const res = await callFetchAccount()
      if(res && res.data){
        dispatch(doLGetAccountAction(res.data))
      }
      console.log(res) 
  }
  useEffect(()=> {
    getAcount();
  },[])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <NotFound/>,
      children: [
        {
          index: true,
          element: <Home/>
        },
        {
          path: 'contact',
          element: <ContactPage/>
        },
        {
          path: 'book/:slug',
          element: <BookPage/>
        },
        {
          path: '/cart',
          element: <ProtectedRoute><OrderPage/></ProtectedRoute>
        },
        
    
      ]
    },

    {
      path: "/admin",
      element: <LayoutAdmin/>,
      errorElement: <NotFound/>,
      children: [
        {
          index: true,
          element: <ProtectedRoute><AdminPage/></ProtectedRoute>
        },
        {
          path: 'user',
          element: <ContactPage/>
        },
        {
          path: 'book',
          element: <BookTable/>
        },
        
      ]
    },
    {
      path: "/history",
      element: <HistoryOrder/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
  ]);

  return (
    <>
      {
        isLoading === false 
        || window.location.pathname ==='/login'  
        || window.location.pathname ==='/register'
        ||window.location.pathname ==='/'
        ? 
        <RouterProvider router={router} /> 
        : 
        <Loading/>
      }
      
    </>
  );
}
