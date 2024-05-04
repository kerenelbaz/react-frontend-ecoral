import { Helmet } from 'react-helmet-async';
import { AddDiveSiteView } from '../sections/addDiveSite';

// ----------------------------------------------------------------------

export default function AddDiveSiteToMapPage() {
  return (
    <>
      <Helmet>
        <title>Add Dive Site</title>
      </Helmet>

      <AddDiveSiteView />
    </>
  );
}
