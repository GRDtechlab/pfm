import { useEffect } from 'react';
import './App.css'
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDashboardDataQuery } from './services/pfm-api';

function App() {
  const {data,error,isLoading,isFetching, isSuccess} = useDashboardDataQuery({user_id:'64a92ec2c0b4c1328f8089b7'});
// 64a92ec2c0b4c1328f8089b7 -- USERID to be passed to check dashboard of the related user.
  return (
    <>
      <div className='container'>
        <Navbar />
        {
          isLoading && <h1>Data is Loading...</h1>
        }
        {
          error && <div> {error.status === 'FETCH_ERROR' && <h1>Server is not Responding. Check after sometimes.</h1>}  </div>
        }
        {data && <Main data={data} /> }
        <Footer />  
      </div>
    </>
  )
}

export default App
