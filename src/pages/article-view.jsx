import { Helmet } from 'react-helmet-async';

import { ArticleView } from 'src/sections/article/view';

// ----------------------------------------------------------------------

export default function ArticleViewPage() {
    return (
      <>
        <Helmet>
          <title> Article View  </title>
        </Helmet>
  
        <ArticleView />
      </>
    );
  }
