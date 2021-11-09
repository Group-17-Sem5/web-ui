// routes
import Routing from './routes';
// theme
import ThemeConfig from './theme';
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
  console.log(loginStatus)
  const Router = useRoutes(Routing(loginStatus));

  return (

    <ThemeConfig>
      <ScrollToTop />
      {Router}
    </ThemeConfig>

  );
}
