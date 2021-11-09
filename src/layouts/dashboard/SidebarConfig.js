import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

import postIcon from '@iconify-icons/mdi/post';


import { Children } from 'react';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  /********Start sidebar menu*******/

  {
    title: 'dashboard',
    path: '/app/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'staff',
    //path: '',
    icon: getIcon(peopleFill),
    children:[
      {
        title: 'postman',
        path: '/app/postman',
      },
      {
        title: 'clerk',
        path: '/app/clerk',
      }
    ]
  },

  {
    title: 'Post',
    //path: '',
    icon: getIcon(postIcon),
    children:[
      {
        title: 'Add',
        path: '/app/addPost',
      },
      {
        title: 'View',
        path: '/app/viewPost',
      }
    ]
  },
  {
    title: 'Money Orders',
    //path: '',
    icon: getIcon(postIcon),
    children:[
      {
        title: 'Add',
        path: '/app/addMoneyOrders',
      },
      {
        title: 'View',
        path: '/app/viewMoneyOrders',
      }
    ]
  },
  {
    title: 'Courier',
    //path: '',
    icon: getIcon(postIcon),
    children:[
      {
        title: 'Add',
        path: '/app/addCourier',
      },
      {
        title: 'View',
        path: '/app/viewCourier',
      }
    ]
  },
  {
    title: 'Users',
    path: '/app/users',
    icon: getIcon(peopleFill)
  },

  // {
  //   title:'services',
  //   icon:getIcon(postIcon),
  //   children:[
  //     {
  //       title: 'normal post',
  //       path: '/app/viewPost',
  //     },
  //     {
  //       title: 'couriers',
  //       path: '/app/viewCourier',
  //     },
  //     {
  //       title: 'money orders',
  //       path: '/app/viewMoneyOrders',
  //     }
  //   ]
  // },

/********End sidebar menu*******/




  // {
  //   title: 'users',
  //   //path: '',
  //   icon: getIcon(peopleFill),
  //   children:[
  //     {
  //       title: 'list',
  //       path: '/app/user',
  //       icon: getIcon(peopleFill),
  //     },
  //     {
  //       title: 'add postman',
  //       path: '/app/addPostman',
  //       icon: getIcon(pieChart2Fill),
  //     },
  //     {
  //       title: 'add clerk',
  //       path: '/app/addClerk',
  //       icon: getIcon(pieChart2Fill),
  //     }
  //   ]
  // },



  
  // {
  //   title: 'product',
  //   path: '/app/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'blog',
  //   path: '/app/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
