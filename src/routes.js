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
import User from './pages/User';
import NotFound from './pages/Page404';
// import AddPostman from './components/postman/newPostman/index'
import AddPostman from './pages/AddPostman'
import AddClerk from './pages/AddClerk'
import AddPost from './pages/AddPost'
import Clerk from './pages/Clerk'
import Post from './pages/Post'
import Postman from './pages/Postman'
import Profile from './pages/Profile'
import ProfileClerk from './pages/ProfileClerk'
import { useDetail } from './context/DetailContext';
import EditProfile from './pages/EditProfile'
import AddMoneyorder from './pages/AddMoneyorder';
import ViewMoneyorder from './pages/MoneyOrder';
import AddCourier from './pages/AddCourier';
import ViewCourier from './pages/Courier';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/app/dashboard" replace /> },
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },

        { path: '/addPostman', element: <AddPostman /> },
        { path: '/editPostman/:id', element: <AddPostman /> },
        { path: '/addClerk', element: <AddClerk /> },
        { path: '/editClerk/:id', element: <AddClerk /> },
        { path: '/addPost', element: <AddPost /> },
        { path: '/postman', element: <Postman /> },
        { path: '/clerk', element: <Clerk /> },
        { path: '/viewPost', element: <Post /> },
        { path: '/profile', element: <Profile /> },
        { path: '/profile/:id', element: <Profile /> },
        { path: '/profileClerk/:id', element: <ProfileClerk /> },
        { path: '/profile/edit', element: <EditProfile /> },
        { path: '/addMoneyOrders', element: <AddMoneyorder /> },
        { path: '/viewMoneyOrders', element: <ViewMoneyorder /> },
        { path: '/addCourier', element: <AddCourier /> },
        { path: '/viewCourier', element: <ViewCourier /> },
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
