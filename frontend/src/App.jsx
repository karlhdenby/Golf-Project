import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SignupFormPage from './components/SignupFormModal/SignupFormModal';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import { Rates } from './components/Rates/Rates';
import { Menu } from './components/Menu/Menu';
import { MonthView } from './components/Calendar/MonthView';
import { TeeTimes } from './components/TeeTimes/TeeTimePage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {isLoaded && <Outlet />}
      <Navigation isLoaded={isLoaded} />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Rates />
      },
      {
        path: "signup",
        element: <SignupFormPage />
      },
      {
        path: '/restaurant',
        element: <Menu />
      },
      {
        path: '/calendar',
        element: <MonthView />
      },
      {
        path: '/teetimes/:month/:day',
        element: <TeeTimes />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;