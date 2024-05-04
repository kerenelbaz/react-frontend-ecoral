import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
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
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Insert Data',
    path: '/insert-data',
    icon: icon('ic_addData'),
  },
  {
    title: 'Login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Register',
    path: '/register',
    icon: icon('register'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Pending Dives',
    path: '/pending-dives',
    icon: <PendingActionsTwoToneIcon />,
  },
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

const isUserLoggedIn = () => {
  return Boolean(localStorage.getItem('user'));
};

const navConfig = isUserLoggedIn() ? fullNavConfig : baseNavConfig;

export default navConfig;