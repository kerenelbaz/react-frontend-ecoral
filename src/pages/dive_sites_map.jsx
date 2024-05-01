import { Helmet } from 'react-helmet-async';

import { DiveSitesMapView } from 'src/sections/diveSitesMap';

// ----------------------------------------------------------------------

export default function Dive_sites_map() {
  return (
    <>
      <Helmet>
        <title> Dive Sites Map </title>
      </Helmet>

      <DiveSitesMapView />
    </>
  );
}
