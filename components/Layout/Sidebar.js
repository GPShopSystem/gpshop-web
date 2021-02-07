import React from 'react';
import TreeMenu from '../TreeMenu';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import { memo } from 'react';

const Sidebar = () => {
  	const categories = useSelector(state => state.general.cat_list)
    const router = useRouter();
    const { query } = router;
    const selectedQueries = query.category;
    const onCategoryClick = (slug) => {
      router.push('/'+slug);
    };
    
    return ( 
        <div className="layout-sidebar-left">
          <TreeMenu 
              data={categories}
              onClick={onCategoryClick}
              active={selectedQueries}
            />
        </div>
     );
}
 
export default memo(Sidebar);