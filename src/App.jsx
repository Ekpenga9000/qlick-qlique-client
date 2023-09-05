import './App.scss';
import { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import UserPage from './pages/User/UserPage/UserPage';
import CliquePage from './pages/Clique/CliquePage/CliquePage';
import CliqueDetailsPage from './pages/Clique/CliqueDetailsPage/CliqueDetailsPage';
import Header from './components/Header/Header';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    
  return (
    <BrowserRouter>
     {userId && <Header userId={ userId } />}
      <Routes>
        <Route path='/' element={ <Authentication/> } />
        <Route path='/profiles/:userId' element={<UserPage setUserId={setUserId} setLoggedIn={ setLoggedIn } /> } />
        <Route path='/cliques' element={<CliquePage/>} />
         <Route path='/cliques/:cliqueid' element={ <CliqueDetailsPage/> } />
      </Routes>
      </BrowserRouter> 
  )
}

export default App
