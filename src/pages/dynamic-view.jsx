import React from 'react';

import { useView } from 'src/viewContexts';

import { BlogView } from 'src/sections/blog/view';
import { AllDataView } from 'src/sections/allData/view';


const DynamicViewPage = () => {
  const { view } = useView();

  return (
    <>
      {view === 'blog' && <BlogView />}
      {view === 'table' && <AllDataView />}
    </>
  );
};

export default DynamicViewPage;
