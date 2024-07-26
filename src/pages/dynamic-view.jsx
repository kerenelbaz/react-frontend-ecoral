import React from 'react';

import { useView } from 'src/viewContexts';

import { AllDivesCardsView } from 'src/sections/blog/view';
import { AllDataView } from 'src/sections/allData/view';


const DynamicViewPage = () => {
  const { view } = useView();

  return (
    <>
      {view === 'cards' && <AllDivesCardsView />}
      {view === 'table' && <AllDataView />}
    </>
  );
};

export default DynamicViewPage;
