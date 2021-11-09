import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User/User';
import MoneyOrder from './pages/MoneyOrder/MoneyOrder';
import Post from './pages/Post/Post';
import Courier from './pages/Courier/Courier'
import NotFound from './pages/Page404';
import Profile from './pages/Profile';
import AddPost from './pages/Post/AddPost';
//import EditProfile from './components/form/editProfile';
import AddMoneyorder from './pages/MoneyOrder/AddMoneyOrder';
import AddCourier from './pages/Courier/AddCourier';
import AddUser from './pages/AddUser';
import ViewPost from './pages/Post/ViewPost';
import ViewCourier from './pages/Courier/ViewCourier';
import ViewMoneyorder from './pages/MoneyOrder/ViewMoneyOrder';
import EditProfile from './pages/EditProfile'
// ----------------------------------------------------------------------

export default function Router() {
  const loginStatus = localStorage.getItem('loginStatus')
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {path: '/' , element: <Navigate to="/dashboard/app"/> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'moneyorder', element: <MoneyOrder /> },
        { path: 'post', element: <Post /> },
        { path: 'courier', element: <Courier /> },
        { path: 'blog', element: <Blog /> },
        {path: '/profile', element: <Profile />},
        { path: '/profile/edit', element: <EditProfile /> },
        {path: '/addpost', element: <AddPost/>},
        {path: '/addcourier', element: <AddCourier/>},
        {path: '/editprofile', element: <EditProfile/>},
        {path: '/adduser', element: <AddUser/>},
        {path: '/viewpost/:id', element: <ViewPost/>},
        { path: '/editPost/:id', element: <AddPost /> },
        {path: '/viewcourier/:id', element: <ViewCourier/>},
        { path: '/editCourier/:id', element: <AddCourier /> },
        {path: '/viewmoneyorder/:id', element: <ViewMoneyorder/>},
        {path: '/addmoneyorder', element: <AddMoneyorder/>},
        { path: '/editMoneyorder/:id', element: <AddMoneyorder /> },
        { path: '/viewMoneyOrders', element: <MoneyOrder /> },
        
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
