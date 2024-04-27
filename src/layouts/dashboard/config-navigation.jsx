import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
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
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Map',
    path: '/map',
    icon: <RoomTwoToneIcon/>,
  },
  {
    title: 'Articles',
    path: '/article-view',
    icon: <AutoStoriesIcon/>,
  },

];

export default navConfig;
