import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';

import SvgColor from 'src/components/svg-color';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';

import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
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
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Dive Sites Map',
    path: '/map',
    icon: <RoomTwoToneIcon/>,
  },
  {
    title: 'Articles',
    path: '/article-view',
    icon: <ImportContactsTwoToneIcon/>,
  },
  {
    title: 'Import Posts',
    path: '/import-posts',
    icon: <ShareTwoToneIcon/>,
  },

];

export default navConfig;
