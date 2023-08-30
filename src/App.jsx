import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { Suspense, lazy} from 'react';
import {  RouterProvider, createBrowserRouter} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

import MainLayout from "./components/main/MainLayout";
import About from "./components/about/About";
import { ConfirmDialogProvider } from "./components/modal/confirm/ConfirmProvider";
import Signup from "./components/authentication/signup/Signup";
import Login from "./components/authentication/login/Login";
import PublicLayout from "./components/public/PublicLayout";
import Landing from "./components/public/home/Landing";
import Loader from "./components/loader/Loader";
import BarChart from "./components/chart/bar/BarChart";
import Chart from "./components/chart/bar/Chart";

const Dashboard = lazy(() => import('./components/dashboard/Dashboard' /*webpackChunkName: "Dashboard-Lazy-Load"*/));
const ListCmp = lazy(() => import('./components/list/ListCmp' /*webpackChunkName: "List-Lazy-Load"*/));
const Transaction = lazy(() => import('./components/transaction/Transaction' /*webpackChunkName: "Transation-Lazy-Load"*/));
const NotFound = lazy(() => import('./components/not-found/NotFound' /*webpackChunkName: "NotFound-Lazy-Load"*/ ))

function App() {
// 64a92ec2c0b4c1328f8089b7 -- USERID to be passed to check dashboard of the related user.
const router = createBrowserRouter([
  {
    path:'/',
    element: <MainLayout/>,
    children:[
      {
        
        index:true,
        element:<Suspense fallback={<h1 className='ml-3'>Loading Dashboard...</h1>}>
                  { <Dashboard /> }
                </Suspense>
      },
      {
        path:'list',
        element: <Suspense fallback={<h1 className='ml-3'>Loading Lists...</h1>}>
                  { <ListCmp /> }
                </Suspense>
      },
      {
        path:'transaction',
        element: <Suspense fallback={<h1 className='ml-3'>Loading Transactions...</h1>}>
                  { <Transaction /> }
                </Suspense>
      },
      {
        path:'chart',
        element: <Suspense fallback={<h1 className='ml-3'>Loading Transactions...</h1>}>
                  { <Chart /> }
                </Suspense>
      },
      {
        path:'logout',
        element: <Suspense fallback={<h1 className='ml-3'>Loggin out...</h1>}>
                    { <Loader message="Logging out in progress" /> }
                 </Suspense>
      }
      
    ]
  },
  {
    path:'public',
    element: <PublicLayout />,
    children:[
      {
        path:'home',
        element:<Suspense fallback={<h1 className="ml-3">Loading Home Page...</h1>}>
                  {<Landing/>}
                </Suspense>
      },
      {
        path: 'login',
        element:<Suspense fallback={<h1 className="ml-3">Loading Login...</h1>}>
                  {<Login/>}
              </Suspense>
      },
      {
        path:'signup',
        element:<Suspense fallback={<h1 className="ml-3">Loading Signup...</h1>}>
          {<Signup/>}
        </Suspense>
      },
      {
        path:'about',
        element: <Suspense fallback={<h1 className="ml-3">Loading About...</h1>}>
                    {<About/>}
                </Suspense>
      }
    ]
  },
  {
    path:'*',
    element:<Suspense fallback={<h1 className="ml-3">Loading Page...</h1>}>
              {<NotFound/>}
            </Suspense>
  }
])
  return (
      <>
        <ConfirmDialogProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </ConfirmDialogProvider>
      </>
    )
}

export default App
