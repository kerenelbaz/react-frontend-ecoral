import { Helmet } from 'react-helmet-async';

import PendingDivesCardsView from 'src/sections/pendingDivesCards/view/pendingDivesCardsView';

// ----------------------------------------------------------------------

export default function PandingDivesCardsPage() {
  return (
    <>
      <Helmet>
        <title> Pending Dives - Admin | Ecoral </title>
      </Helmet>
     
      <PendingDivesCardsView />
    </>
  );
}
