// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function App() {
  const loginStatus = localStorage.getItem('loginStatus')
  const navigate = useNavigate()
  useEffect(()=>{
    if(!loginStatus){
      navigate('/', { replace: true });
    }
  },[])
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}
