import './App.scss';
import { useState } from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import UserPage from './pages/User/UserPage/UserPage';
import CliquePage from './pages/Clique/CliquePage/CliquePage';
import CliqueDetailsPage from './pages/Clique/CliqueDetailsPage/CliqueDetailsPage';
import Header from './components/Header/HeaderSide/Header';
import UserDashboardPage from "./pages/User/UserDashboardPage/UserDashboardPage";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HeaderTop from './components/Header/HeaderTop/HeaderTop';
import HeaderBottom from './components/Header/HeadrBottom/HeaderBottom';
import PostPage from './pages/PostsPage/PostPage';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  
  return (
    <section className='app'>
      <BrowserRouter>
        <div className='app__header--side'>
          {userId && <Header userId={userId} />}
        </div>  
        <div className='app__header--top'>
        {userId && <HeaderTop userId={ userId } />} 
      </div>
      <Routes>
        <Route path='/' element={ <Authentication/> } />
        <Route path='/profiles/:userId' element={<UserPage setUserId={setUserId} setLoggedIn={ setLoggedIn } /> } />
        <Route path='/dashboard/:userid' element={<UserDashboardPage user_id={setUserId} /> } />
        <Route path='/cliques' element={<CliquePage/>} />
        <Route path='/cliques/:cliqueid' element={<CliqueDetailsPage />} />
        <Route path=':cliqueid/posts/:postid' element={<PostPage/>} />
        <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
        <div className="app__header--bottom">
        {userId && <HeaderBottom userId={ userId } />}
        </div>
      </BrowserRouter>
      
      </section>
  )
}

export default App
