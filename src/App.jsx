import { useEffect } from 'react';
import './App.css'
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar'
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {

  const  pfmApiData = async () => {
    let data = await fetch('http://localhost:5001/api/pfm',{
      method:'GET'
    })
    let apiData = await data.json();
    
    return apiData
  }

  useEffect( () => {
    const apiData = pfmApiData();
    apiData.then(data => console.log( new Date (data[0].createdAt).toLocaleDateString()))

  },[])

  return (
    <>
      <div className='container'>
        <Navbar />
        <Main />
        <Footer />  
      </div>
    </>
  )
}

export default App
