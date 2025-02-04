import React from 'react';
import { Link } from 'react-router-dom'; 

const ErrorPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.errorContainer}>
                <h1 style={styles.errorCode}>404</h1>
                <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" style={styles.link}>
                    Go back to Homepage
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
    },
    errorContainer: {
        textAlign: 'center',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    errorCode: {
        fontSize: '100px',
        fontWeight: 'bold',
        color: '#ff4d4f',
    },
    message: {
        fontSize: '20px',
        color: '#555',
    },
    link: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#1890ff',
        textDecoration: 'none',
    },
};

export default ErrorPage;
