import { Helmet } from 'react-helmet-async';

import { ImportPostsView } from 'src/sections/importPosts';

// ----------------------------------------------------------------------

export default function ImportPostsPage() {
  return (
    <>
      <Helmet>
        <title> Import Posts - Admin | Ecoral </title>
      </Helmet>

      <ImportPostsView />
    </>
  );
}
