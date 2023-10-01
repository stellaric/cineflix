
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from './components/Loader';
import Details from './pages/DetailsMovie/DetailsMovie'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
   
  },
  {
    path: "/movie/:id", // pour capturer l'ID du film 
    element: <Details />,
  },
  {
    path: "/loader", // pour capturer l'ID du film 
    element: <Loader />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


