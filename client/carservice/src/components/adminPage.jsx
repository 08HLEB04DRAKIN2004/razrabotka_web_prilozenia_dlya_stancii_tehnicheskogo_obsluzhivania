import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Grid } from '@mui/material';
import EmployeeSection from './employeesAdminPage';
import ServiceSection from './adminServicePage';
import PartSection from './adminPartsPage';
import { fetchEmployees } from '../redux/slices/employees';
import { fetchServices } from '../redux/slices/services';
import { fetchParts } from '../redux/slices/parts';

const AdminPage = () => {
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        dispatch(fetchEmployees());
        dispatch(fetchServices());
        dispatch(fetchParts());
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div>
            <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Сотрудники" />
                <Tab label="Услуги" />
                <Tab label="Запчасти" />
            </Tabs>
            {selectedTab === 0 && <EmployeeSection />}
            {selectedTab === 1 && <ServiceSection />}
            {selectedTab === 2 && <PartSection />}
        </div>
    );
};

export default AdminPage;
