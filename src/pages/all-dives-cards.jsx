import { Helmet } from 'react-helmet-async';

import { AllDivesCardsView } from 'src/sections/allDivesCards/view';

// ----------------------------------------------------------------------

export default function AllDivesCardsPage() {
  return (
    <>
      <Helmet>
        <title> All Dives - Admin | Ecoral  </title>
      </Helmet>

      <AllDivesCardsView />
    </>
  );
}
