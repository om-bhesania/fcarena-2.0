import { useState } from 'react';
import Button from '../components/buttons/Button';
import { json, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import Dashboard from './Dashboard';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [LoginAuthToken, setLoginAuthToken] = useState('');
    const [validateUsername, setValidateUsername] = useState(false);
    const [validatePassword, setValidatePassword] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    function handleSubmit(e) {
        e.preventDefault();

        if (username === 'admin' && password === 'admin') {
            setLoginStatus('success');
            redirectToDashboard();
            const LoginAuthToken = uuidv4()
            setLoginAuthToken(LoginAuthToken)
            sessionStorage.setItem('LoginAuthToken', JSON.stringify(LoginAuthToken));

        } else {
            setLoginStatus('error');
            toast({
                title: 'Login Failed',
                description: 'Invalid Username or Password',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        }
    }

    const redirectToDashboard = () => {
        const dashboardRedirectPromises = new Promise((resolve) => {
            setTimeout(() => {
                resolve(navigate('/dashboard', { replace: true }));
            }, 2000);
        });

        toast.promise(
            dashboardRedirectPromises,
            {
                loading: {
                    title: 'Login Successful',
                    description: 'Redirecting to admin panel',
                    position: 'top'
                },
                success: {
                    title: 'Welcome to Admin Panel',
                    position: 'top'
                },
                error: {
                    title: 'Login Failed',
                    description: 'Failed to redirect',
                    position: 'top'
                },
            },
            {
                // Custom options for toast
                position: 'top',
                duration: 3000,
                isClosable: true,
            }
        );
    };

    function handleUsernameChange(e) {
        setUsername(e.target.value);
        setValidateUsername(false);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setValidatePassword(false);
    }

    return (
        <section className='login-section'>
            <div className='container'>
                <div className='login-wrapper md:py-[9%] py-[35%]'>
                    <form onSubmit={handleSubmit} className='flex flex-col md:max-w-[50%] mx-auto gap-5 border-dashed border-2 p-6 border-primary'>
                        <h1 className='text-4xl font-bold'>Admin Login</h1>
                        <div className='flex flex-col'>
                            <input type='text' className='border-primary border rounded-lg p-2' placeholder='Username' value={username} onChange={handleUsernameChange} />
                            {validateUsername && <span className='text-red-600'>Please Enter Correct Username</span>}
                        </div>
                        <div className='flex flex-col'>
                            <input type='password' className='border-primary border rounded-lg p-2' placeholder='Password' value={password} onChange={handlePasswordChange} />
                            {validatePassword && <span className='text-red-600'>Please Enter Correct Password</span>}
                        </div>
                        <Button role={'button'} label={'Login'} variant={'primary'} customClass={'font-bold md:w-[20%] w-[50%] text-center mx-auto'} type={'submit'} />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
