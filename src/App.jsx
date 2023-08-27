import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import UserPage from './pages/User/UserPage/UserPage';
import UserProfilePage from './pages/User/UserProfilePage/UserProfilePage';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Authentication/> } />
        <Route path='/users/:userId' element={ <UserPage/> } />
        <Route path='/users/profile/:userId' element={ <UserProfilePage/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
