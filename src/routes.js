import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
// import AddPostman from './components/postman/newPostman/index'
import AddPostman from './components/form/addPostman'
import AddClerk from './pages/clerk/AddClerk'
import AddPost from './pages/post/AddPost'
import Clerk from './pages/clerk/Clerk'
import Post from './pages/post/Post'
import Postman from './pages/postman/Postman'
import Profile from './pages/Profile'
import ProfileClerk from './pages/ProfileClerk'
import { useDetail } from './context/DetailContext';
import EditProfile from './pages/EditProfile'
import AddMoneyorder from './pages/moneyorder/AddMoneyorder';
import ViewMoneyorder from './pages/moneyorder/MoneyOrder';
import AddCourier from './pages/courier/AddCourier';
import ViewCourier from './pages/courier/Courier';
import Login from './pages/Login';
import User from './pages/user/User'
import AddUser from './pages/user/AddUser'
import X from './pages/postman/x'
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <DashboardApp /> },
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
        { path: '/users', element: <User /> },
        { path: '/editUser/:id', element: <AddUser /> },
        { path: '/addUser', element: <AddUser /> },
        { path: '/x', element: <X /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
