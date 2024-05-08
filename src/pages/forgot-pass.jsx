import { Helmet } from 'react-helmet-async';

import { ForgotPass } from 'src/sections/forgotPass';

// ----------------------------------------------------------------------

export default function ForgotPassPage() {
  return (
    <>
      <Helmet>
        <title> Forgat Password | Ecoral  </title>
      </Helmet>

      <ForgotPass />
    </>
  );
}
