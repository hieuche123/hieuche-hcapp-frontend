import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from "./pages/contact";
import BookPage from "./pages/book";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { useEffect } from "react";
import { callFetchAccount } from "./services/api";

const Layout = () => {

  return (
    <div className="layout-app">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
export default function App() {
  const getAcount = async () => {
      const res = await callFetchAccount()
      console(res) 
  }
  useEffect(()=> {
    getAcount();
  },[])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <div>404</div>,
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
          path: 'book',
          element: <BookPage/>
        },
      ]
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
      <RouterProvider router={router} />
    </>
  );
}
