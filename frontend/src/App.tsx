// App.js
import React, { useEffect } from 'react';
import { LayoutProvider } from './providers/layoutprovider';
import { AlertProvider } from './providers/alertprovider';
import { QueryProvider } from './providers/queryprovider';
import { Routes, Route, useNavigate, RouteObject } from 'react-router-dom';
import routes from './providers/routes';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <LayoutProvider>
      <AlertProvider>
        <QueryProvider>
          <Routes>
            {routes.map((route: RouteObject) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </QueryProvider>
      </AlertProvider>
    </LayoutProvider>
  );
}

export default App;
