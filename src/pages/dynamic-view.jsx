import React from 'react';

import { useView } from 'src/viewContexts';

import { AllDataView } from 'src/sections/allData/view';
import { AllDivesCardsView } from 'src/sections/allDivesCards/view';


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
