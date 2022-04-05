import React from 'react';
import Header from './components/Header';


function Layout({ children }) {
    return (
        <div className='page-container'>
            <div className='page-header'>
                <Header />
            </div>
            <div className='page-main'>
                {children}
            </div>
        </div>
    )
}

export default Layout;


