import { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState({
    name: 'Dashboard',
    description: 'Halaman utama untuk melihat statistik dan ringkasan data',
    features: []
  });

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};
