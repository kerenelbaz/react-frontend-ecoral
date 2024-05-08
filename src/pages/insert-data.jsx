import { Helmet } from 'react-helmet-async';

import { InsertDataView } from 'src/sections/insertData/view';

// ----------------------------------------------------------------------

export default function InsertDataPage() {
    return (
      <>
        <Helmet>
          <title> Insert Data | Ecoral  </title>
        </Helmet>
  
        <InsertDataView />
      </>
    );
  }
