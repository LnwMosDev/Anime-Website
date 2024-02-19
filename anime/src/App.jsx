import React from 'react';
import AnimeList from './component/AnimeList';
import Header from './component/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './component/Admin';
import AboutMe from './component/AboutMe';
import Footer from './component/footer';
import LoginWithLocalStorage from './LoginWithLocalStorage';
import LoginWithLocalStorageUser from './LoginWithLocalStorageUser';
import Users from './Users';


function App() {
  const serverName = "http://localhost:8080/anime/";
  // const serverName = "http://student.crru.ac.th/641413019/anime/";

  return (
    <BrowserRouter>
      <Header /> 
      <div className="container mx-auto px-6 py-8">
        <Routes>
          <Route index element={<AnimeList serverName={serverName}/>} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/Admin" element={<Admin />} /> 
          <Route path="/LoginWithLocalStorage" element={<LoginWithLocalStorage />} /> 
          <Route path="/LoginWithLocalStorageUser" element={<LoginWithLocalStorageUser />} /> 
          <Route path="/Users" element={<Users />} /> 
                 
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
