import { Helmet } from 'react-helmet-async';

import PendingAdminView from 'src/sections/pendingAdmin/view/pendingAdmin-view';

// ----------------------------------------------------------------------

export default function PandingAdminPage() {
  return (
    <>
      <Helmet>
        <title> Pending Dives</title>
      </Helmet>
     
      <PendingAdminView />
    </>
  );
}
