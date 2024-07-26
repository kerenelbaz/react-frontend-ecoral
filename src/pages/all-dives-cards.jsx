import { Helmet } from 'react-helmet-async';

import { AllDivesCardsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function AllDivesCardsPage() {
  return (
    <>
      <Helmet>
        <title> All Dives - Admin | Ecoral  </title>
      </Helmet>

      <AllDivesCardsView/>
    </>
  );
}
