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
import Moneyorder from './pages/moneyorder/MoneyOrder';
import AddCourier from './pages/courier/AddCourier';
import Courier from './pages/courier/Courier';
import Login from './pages/Login';
import User from './pages/user/User'
import AddUser from './pages/user/AddUser'
import ViewPost from './pages/post/ViewPost';
import ViewCourier from './pages/courier/ViewCourier';
import ViewMoneyorder from './pages/moneyorder/ViewMoneyorder';
// ----------------------------------------------------------------------

 const Router = (loginStatus) =>
  
   [
    {
      path: '/app',
      element: loginStatus ? <DashboardLayout /> : <Navigate to="/" />,
      children: [
        { path: '', element: <DashboardApp /> },
        { path: '/dashboard', element: <DashboardApp /> },
        { path: '/addPostman', element: <AddPostman /> },
        { path: '/editPostman/:id', element: <AddPostman /> },
        { path: '/addClerk', element: <AddClerk /> },
        { path: '/editClerk/:id', element: <AddClerk /> },
        { path: '/addPost', element: <AddPost /> },
        { path: '/editPost/:id', element: <AddPost /> },
        { path: '/viewPost/:id', element: <ViewPost /> },
        { path: '/postman', element: <Postman /> },
        { path: '/clerk', element: <Clerk /> },
        { path: '/viewPost', element: <Post /> },
        { path: '/profile', element: <Profile /> },
        { path: '/profile/:id', element: <Profile /> },
        { path: '/profileClerk/:id', element: <ProfileClerk /> },
        { path: '/profile/edit', element: <EditProfile /> },
        { path: '/addMoneyOrders', element: <AddMoneyorder /> },
        { path: '/editMoneyorder/:id', element: <AddMoneyorder /> },
        { path: '/viewMoneyorder/:id', element: <ViewMoneyorder /> },
        { path: '/viewMoneyOrders', element: <Moneyorder /> },
        { path: '/addCourier', element: <AddCourier /> },
        { path: '/editCourier/:id', element: <AddCourier /> },
        { path: '/viewCourier', element: <Courier /> },
        { path: '/viewCourier/:id', element: <ViewCourier /> },
        { path: '/users', element: <User /> },
        { path: '/editUser/:id', element: <AddUser /> },
        { path: '/addUser', element: <AddUser /> },
      ]
    },
    {
      path: '/',
      element: !loginStatus ? <LogoOnlyLayout /> : <Navigate to="/app/dashboard"/>,
      children: [
        { path: '', element: <Login /> },
        // loginStatus && {path: '' , element: <Navigate to="/dashboard"/> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ];

  export default Router