import { Helmet } from 'react-helmet-async';

import { WelcomeView } from 'src/sections/welcome';

// ----------------------------------------------------------------------

export default function WelcomePage() {
  return (
    <>
      <Helmet>
        <title> ECORAL </title>
      </Helmet>

      <WelcomeView />
    </>
  );
}
