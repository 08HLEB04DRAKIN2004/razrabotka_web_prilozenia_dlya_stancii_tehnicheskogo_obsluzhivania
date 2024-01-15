import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { CssBaseline, Box } from '@mui/material';
import './App.css';

import LoginPage from './components/login';
import RegistrationPage from './components/register';
import Header from './components/header';
import HomePage from './components/homepage';
import ServicesPage from './components/services';
import EmployeesPage from './components/employee';
import PartsPage from './components/parts';
import OrdersPage from './components/orders';
import OrderForm from './components/orderForm';
import Footer from './components/footer';
import ServicesAdminPage from './components/adminServicePage';
import AdminPartsPage from './components/adminPartsPage';
import EmployeesAdminPage from './components/employeesAdminPage';
import AdminPage from './components/adminPage';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1} sx={{ width: '100%' }}>
          <Routes>
              <Route path='/' element={<HomePage></HomePage>} />
              <Route path='/services' element={<ServicesPage></ServicesPage>} />
              <Route path='/employees' element={<EmployeesPage></EmployeesPage>} />
              <Route path='/parts' element={<PartsPage></PartsPage>} />
              <Route path='/orders' element={<OrdersPage></OrdersPage>} />
              <Route path='/order-creating' element={<OrderForm></OrderForm>} />
              <Route path='/adminka' element={<ServicesAdminPage/>} />
              <Route path='/adminka1' element={<AdminPartsPage/>} />
              <Route path='/adminka2' element={<EmployeesAdminPage/>} />
              <Route path='/admin-page' element={<AdminPage/>} />
              {!isAuth && <Route path='/registration' element={<RegistrationPage/>} />}
              {!isAuth && <Route path='/login' element={<LoginPage/>} />}
              {isAuth && <Route path="*" element={<Navigate to="/" />} />}
              {!isAuth && <Route path="*" element={<Navigate to="/login" />} />}
          </Routes>
        </Box>
        <Footer></Footer>
      </Box>
    </div>
  );
}

export default App;
