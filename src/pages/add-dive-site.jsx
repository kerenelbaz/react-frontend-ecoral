import { Helmet } from 'react-helmet-async';

import { AddDiveSiteView } from 'src/sections/addDiveSite';

// ----------------------------------------------------------------------

export default function AddDiveSitePage() {
  return (
    <>
      <Helmet>
        <title> Add Dive Site </title>
      </Helmet>

      <AddDiveSiteView />
    </>
  );
}