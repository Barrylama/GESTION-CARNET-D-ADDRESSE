import {
     createBrowserRouter,
   } from "react-router-dom";
 
   import LoginPage from "./features/auth/loginPage";
   import RegisterPage from "./features/auth/registerPage";
   import DashboardPages from "./routes/dashboard";
   import Home from "./features/auth/home";
   import AddContact from "./features/contact/AddContact";
   import ListContact from "./features/contact/ListContact";
 
 
  export const router = createBrowserRouter([
     {
       path: "/login",
       element: <LoginPage />,
     },
     {
          path: "/",
          element: <Home />,
        },
     {
          path: "/register",
          element: <RegisterPage />,

     },
     
     {
         path: "/dashboard",
         element: <DashboardPages />,
         children: [
             {
                 path: "",
                 element: <h1>Dashboard</h1>,
             },
             {
                 path: "users",
                 element: <h1>Users</h1>,
             },
             {
                 path: "contacts",
                 element: <ListContact />,
             },
             
         ]
     }
   ]);