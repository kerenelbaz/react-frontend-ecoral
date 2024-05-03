import { Helmet } from 'react-helmet-async';

import { AddArticle } from 'src/sections/addArticle/view';

// ----------------------------------------------------------------------

export default function AddArticlePage() {
    return (
      <>
        <Helmet>
          <title> Add Article | Minimal UI </title>
        </Helmet>
  
        <AddArticle />
      </>
    );
  }
