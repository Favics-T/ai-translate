import React, { useEffect } from 'react';
import {HashRouter as Router,Routes,Route,Outlet} from 'react-router-dom';
import Home from './page/Home';
import Chats from './page/Chats';




const App = () => {

  useEffect(() => {
    const originMeta = document.createElement("meta");
    originMeta.httpEquiv = "origin-trial";
    originMeta.content = import.meta.env.VITE_SUMMARIZER_TOKEN;  // Fetch from .env file
  
    document.head.appendChild(originMeta);
    console.log("Origin Trial Token Added:", originMeta.content);
  
    return () => {
        document.head.removeChild(originMeta); // Cleanup when component unmounts
    };
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Layout />}> */}
          <Route index element={<Home />}/>
          <Route path='home' element={<Home />} />
          <Route path='chats' element={<Chats />}/>

          {/* </Route> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
