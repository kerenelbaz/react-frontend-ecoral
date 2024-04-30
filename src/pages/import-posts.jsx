import { Helmet } from 'react-helmet-async';

import { ImportPostsView } from 'src/sections/importPosts';

// ----------------------------------------------------------------------

export default function Dive_sites_map() {
  return (
    <>
      <Helmet>
        <title> Import posts </title>
      </Helmet>

      <ImportPostsView />
    </>
  );
}
