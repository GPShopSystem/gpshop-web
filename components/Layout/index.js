import React, { memo } from 'react';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
    const router = useRouter();
    const availableSidebar =  [
        '/checkout',
        '/cart'
    ]
    const showSidebar = !availableSidebar.includes(router.pathname)

    return ( <div className="layout">
        { showSidebar && (<Sidebar />) }
        <div className={`layout-content ${!showSidebar ? 'whsidebar' : ''}`}>
            { children }
        </div>
    </div>);
}
 
export default Layout;