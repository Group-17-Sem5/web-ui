// routes
import Routing from './routes';
// theme
import ThemeConfig from './theme';
import './App.css';
// components
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRoutes } from 'react-router-dom';
import { useDetail } from './context/DetailContext';
// ----------------------------------------------------------------------

export default function App() {
   
  const {loginStatus} = useDetail()
  const isLoggedIn = localStorage.getItem('loginStatus')
  
  const Router = useRoutes(Routing(loginStatus));

  return (

    <ThemeConfig>
      <ScrollToTop />
      {Router}
    </ThemeConfig>

  );
}
