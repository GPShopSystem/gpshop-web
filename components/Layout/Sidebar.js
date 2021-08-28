import React from 'react';
import TreeMenu from '../TreeMenu';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import * as generalActions from '../../redux/actions/general'
import { memo } from 'react';

const Sidebar = ({className = ''}) => {
  const dispatch = useDispatch()
  	const toUse = useSelector(state => state.general)
  	const categories = toUse.cat_list
    const router = useRouter();
    const { query } = router;
    const selectedQueries = query.category;
    const onCategoryClick = (slug) => {
      dispatch(generalActions.toggleMenu(false))
      router.push('/'+slug);
    };
    return ( 
        <div className={className}>
          <TreeMenu 
              data={categories}
              onClick={onCategoryClick}
              active={selectedQueries}
            />
        </div>
     );
}
 
export default memo(Sidebar);