import React from 'react';
import Link from 'next/link'
import Buttons from './Buttons';
import { openModal, closeModal } from '@redq/reuse-modal';
import { useRouter } from 'next/router';
import { Eye }  from 'react-feather'
import dynamic from 'next/dynamic';
const View = dynamic(() => import('./View'));

const CURRENCY = 'S/' 

const ProductCard = ({data}) => {
    const router = useRouter();

    const handleQuickVieModalClose = () => {
        const { pathname, query, asPath } = router
        const as = asPath
        router.push({ pathname,query}, as, { shallow: true })
        closeModal()
    }
    
    const handleQuickViewModal = () => {
        const { pathname, query } = router;
        const as = `/${data.catSlug}/${data.slug}`;
        if (pathname === '/[category]/[product]') {
            return router.push(pathname, as);
        }
        openModal({
          show: true,
          overlayClassName: 'quick-view-overlay',
          closeOnClickOutside: false,
          component: View,
          componentProps: { product: data, isModal: true, onClose: handleQuickVieModalClose },
          closeComponent: 'div',
          config: {
            enableResizing: false,
            disableDragging: true,
            className: 'quick-view-modal-product',
            width: 750,
            y: 30,
            height: 'auto'
          },
        });

        router.push({ pathname, query }, { pathname: as, }, { shallow: true })
    };

    return (
        <div className="productCard useProduct">
            <div className="productCard-thumb" onClick={handleQuickViewModal}>
                <div 
                    className="productCard-thumb-image" 
                    style={{backgroundImage: 'url('+data.image+')'}}
                    >
                    <div className="quickView"><Eye color={'#fff'} size={40} /></div>
                </div>
            </div>

            <div className="productCard-description">
                <div className="productCard-price">
                    <span className="price">{CURRENCY}{data.price.toFixed(2)}</span>
                </div>

                <Link href={`/${data.catSlug}/${data.slug}`}>
                    <a>
                        <span className="productCard-title">{data.title}</span>
                    </a>
                </Link>
                <div className="productCard-excerpt">
                    {data.presentation}
                </div>
                
                <Buttons data={data} />
            </div>
        </div>
    );
}
 
export default ProductCard;