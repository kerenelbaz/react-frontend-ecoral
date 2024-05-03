import { Helmet } from 'react-helmet-async';

import { ManageUsersView } from 'src/sections/manageUsers/view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Manage Users | Minimal UI </title>
      </Helmet>

      <ManageUsersView />
    </>
  );
}
