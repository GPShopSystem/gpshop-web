import React, { memo } from 'react';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import Footer from './Footer';

const Layout = ({ children }) => {
    const router = useRouter();
    const availableSidebar =  [
        '/checkout',
        '/cart'
    ]
    const showSidebar = !availableSidebar.includes(router.pathname)

    return ( <div className="layout">
        { showSidebar && (<Sidebar className='layout-sidebar-left' />) }
        <div className={`layout-content ${!showSidebar ? 'whsidebar' : ''}`}>
            { children }

            <Footer />
        </div>
    </div>);
}
 
export default Layout;