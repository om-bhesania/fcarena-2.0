import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ component: Component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const loginAuthToken = JSON.parse(sessionStorage.getItem('LoginAuthToken'));
        if (!loginAuthToken) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        // Set a timeout to clear the session storage after 1 hour
        const clearSession = setTimeout(() => {
            sessionStorage.removeItem('LoginAuthToken');
        }, 60 * 60 * 1000); 
        return () => {
            clearTimeout(clearSession);
        };
    }, []);

    return <Component />;
};

export default PrivateRoutes;
