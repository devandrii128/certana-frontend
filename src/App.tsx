import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import routes from './routes';
import './index.css';

const App: React.FC = () => {
  const routing = useRoutes(routes);
  
  return (
    <AuthProvider>
      {routing}
    </AuthProvider>
  );
};

export default App;