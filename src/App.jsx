import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';

import { Suspense, lazy} from 'react';
import {  RouterProvider, createBrowserRouter} from 'react-router-dom';

import MainLayout from "./components/main/MainLayout";
const Dashboard = lazy(() => import('./components/dashboard/Dashboard' /*webpackChunkName: "Dashboard-Lazy-Load"*/));
const ListCmp = lazy(() => import('./components/list/ListCmp' /*webpackChunkName: "List-Lazy-Load"*/));

function App() {
// 64a92ec2c0b4c1328f8089b7 -- USERID to be passed to check dashboard of the related user.
const router = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[
      {
        path:'/',
        element:<Suspense fallback={<h1 className='ml-3'>Loading Dashboard...</h1>}>
                  { <Dashboard /> }
                </Suspense>
      },
      {
        path:'list',
        element: <Suspense fallback={<h1 className='ml-3'>Loading Lists...</h1>}>
                  { <ListCmp /> }
                </Suspense>
      }
    ]
  }
])
  return (
      <>
        <RouterProvider router={router} />
      </>
    )
}

export default App
