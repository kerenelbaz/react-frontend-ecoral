import { Helmet } from 'react-helmet-async';

import AllDataView from 'src/sections/allData/view/allData-view';

// ----------------------------------------------------------------------

export default function AllDataPage() {
  return (
    <>
      <Helmet>
        <title> All Data - Admin | Ecoral </title>
      </Helmet>
     
      <AllDataView />
    </>
  );
}
