import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
// import ScubaDivingTwoToneIcon from '@mui/icons-material/ScubaDivingTwoTone';
import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';

import SvgColor from 'src/components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const baseNavConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Dive Sites Map',
    path: '/map',
    icon: <RoomTwoToneIcon />,
  },
  {
    title: 'Articles',
    path: '/article-view',
    icon: <ImportContactsTwoToneIcon />,
  }
];

export const fullNavConfig = [
  ...baseNavConfig,
  // {
  //   title: 'Product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'Insert Data',
    path: '/insert-data',
    icon: icon('ic_addData'),
  },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Register',
  //   path: '/register',
  //   icon: icon('register'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
  
  {
    title: 'Pending Dives',
    path: '/pending-dives',
    icon: <PendingActionsTwoToneIcon />,
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'All Dives',
  //   path: '/all-data',
  //   icon: <ScubaDivingTwoToneIcon />,
  // },
  {
    title: 'Import Posts',
    path: '/import-posts',
    icon: <ShareTwoToneIcon />,
  },
  {
    title: 'Add Dive Site',
    path: '/add-dive-site',
    icon: <AddLocationAltTwoToneIcon />,
  },
  {
    title: 'Add Articles',
    path: '/add-article',
    icon: <AutoStoriesIcon/>,
  }
];

export const limitedNavConfig = fullNavConfig.filter(item => !['blog' , 'Pending Dives','All Dives', 'Import Posts', 'Add Dive Site', 'Add Articles'].includes(item.title));

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("User from localStorage:", user);
  return user;
};

const navConfig = () => {
  const user = getUser();
  console.log("Email of the user:", user ? user.email : "No user logged in");
  
  if (!user) {
    return baseNavConfig;
  // eslint-disable-next-line no-else-return
  } else if (user.email !== 'admin@admin.com') {
    return limitedNavConfig;
  } else {
    return fullNavConfig;
  }
};

export default navConfig;