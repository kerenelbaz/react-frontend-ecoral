import { Helmet } from 'react-helmet-async';

import { useLocation } from 'react-router-dom';

import { RestorePass } from 'src/sections/restorePass';



// ----------------------------------------------------------------------

export default function ForgotPassPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  

  return (
    <>
      <Helmet>
        <title> Restore Password | Minimal UI </title>
      </Helmet>

      <RestorePass email={email}/>
    </>
  );
}
