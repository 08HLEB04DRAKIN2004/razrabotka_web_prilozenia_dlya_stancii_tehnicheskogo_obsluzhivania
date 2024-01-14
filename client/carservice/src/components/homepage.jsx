import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/slices/services';
import { fetchParts } from '../redux/slices/parts';
import { fetchEmployees } from '../redux/slices/employees';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees.employees.slice(0, 4));
    const parts = useSelector(state => state.parts.parts.slice(0, 4));
    const services = useSelector(state => state.services.services.slice(0, 4));

    useEffect(() => {
        dispatch(fetchEmployees());
        dispatch(fetchParts());
        dispatch(fetchServices());
    }, [dispatch]);

    const renderEmployees = () => (
        <Grid container spacing={2}>
            {employees.map(employee => (
                <Grid item key={employee._id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="540"
                            image={employee.imageUrl || 'default_employee_image.jpg'}
                            alt={employee.name}
                        />
                        <CardContent>
                            <Typography variant="h5">{employee.name}</Typography>
                            <Typography variant="body1">{employee.position}</Typography>
                            <Typography variant="body2">{employee.specialization}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    const renderParts = () => (
        <Grid container spacing={2}>
            {parts.map(part => (
                <Grid item key={part._id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="540"
                            image={part.imageUrl || 'default_part_image.jpg'}
                            alt={part.name}
                        />
                        <CardContent>
                            <Typography variant="h5">{part.name}</Typography>
                            <Typography variant="body1">{`Price: $${part.price}`}</Typography>
                            <Typography variant="body2">{part.description}</Typography>
                            <Typography variant="body2">{part.available ? 'Available' : 'Not Available'}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    const renderServices = () => (
        <Grid container spacing={2}>
            {services.map(service => (
                <Grid item key={service._id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="540"
                            image={service.imageUrl || 'default_service_image.jpg'}
                            alt={service.name}
                        />
                        <CardContent>
                            <Typography variant="h5">{service.name}</Typography>
                            <Typography variant="body1">{`Price: $${service.price}`}</Typography>
                            <Typography variant="body2">{service.description}</Typography></CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Добро пожаловать в наш автосервис
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '2rem' }}>
                В нашем современном автосервисном центре мы гордимся тем, что предоставляем беспрецедентное качество и удовлетворенность клиентов. Наша команда высококвалифицированных и увлеченных профессионалов позаботится о том, чтобы ваш автомобиль получил наилучший уход. Благодаря нашим первоклассным запчастям и исключительному обслуживанию мы гарантируем превосходный уход за автомобилем. Наш персонал не просто хорошо обучен; они автолюбители, которые понимают важность ухоженного автомобиля. Мы используем только детали высочайшего качества, гарантируя, что ваш автомобиль не только ремонтируется, но и улучшается с каждым посещением. Доверьтесь нам, и мы станем вашим местом назначения для всех ваших автомобильных потребностей - где совершенство не просто обещано, но и реализовано!            </Typography>

            <Typography variant="h4" gutterBottom>
                Мы оказываем услуги
            </Typography>
            {renderServices()}
            <Typography>
                <Link to='/services'>
                    подробнее
                </Link>
            </Typography>

            <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
                Мы являемся официальным дестрибьютером лучших автозапчастей
            </Typography>
            {renderParts()}
            <Typography>
                <Link to='/parts'>
                    подробнее
                </Link>
            </Typography>

            <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
                Наши мастера
            </Typography>
            {renderEmployees()}
            <Typography>
                <Link to='/employees'>
                    подробнее
                </Link>
            </Typography>
        </div>
    );
};

export default HomePage;