import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='mx-auto'>
            <Navbar/>
            <div className='max-w-7xl mx-auto'>
                <Outlet/>
            </div>
        </div>
    );
};

export default RootLayout;