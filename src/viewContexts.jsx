import PropTypes from 'prop-types';
import React, { useMemo, useState, useContext, createContext } from 'react'; // Import PropTypes

const ViewContext = createContext();

export function ViewProvider({ children }) { // Destructure children from props
  const [view, setView] = useState('blog'); // default view

  const switchToBlog = () => setView('blog');
  const switchToTable = () => setView('table');

  // Memoize the context value to prevent re-renders
  const contextValue = useMemo(() => ({
    view,
    switchToBlog,
    switchToTable
  }), [view]);

  return (
    <ViewContext.Provider value={contextValue}>
      {children}
    </ViewContext.Provider>
  );
}

// Define PropTypes for ViewProvider
ViewProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useView() {
  return useContext(ViewContext);
}
