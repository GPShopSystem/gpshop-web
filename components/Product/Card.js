import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Buttons from './Buttons';
import { useRouter } from 'next/router';
import { Eye }  from 'react-feather'
import AlertAdded from './AlertAdded';
import * as cartGeneral from '../../redux/actions/general'

const ProductCard = ({data}) => {
    const dispatch = useDispatch()
    const [showAlert, setShowAlert] = useState(false)
	const products = useSelector(state => state.cart.list)
    const inCart = products.find(e => e.id === data.id)
    const router = useRouter();
    const isOffer = data.active_discount !== 0
    const priceToShow = isOffer ? data.original_price : data.price
    const currency = process.env.currency
    
    const handleQuickViewModal = () => {
        const { pathname, query } = router;
        const as = `/${data.catSlug}/${data.slug}`;
        if (pathname === '/[category]/[product]') {
            return router.push(as, undefined, { scroll: true }).then(() => window.scrollTo(0, 0));
        }

        dispatch(cartGeneral.setProduct(data))
        dispatch(cartGeneral.toggleProduct(true))
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
                {
                    isOffer && ( 
                        <img className="tagPrice" src="https://images.ctfassets.net/dfhnfm93fvnr/2hQ3nJFWnaybKBaNulT7BP/ead7556968adf9bd5ac8d1ed0a8cd3cd/preciazos.svg?q=75" />
                    )
                }
            </div>

            <div className="productCard-description">
                <AlertAdded show={showAlert} onFinish={() => setShowAlert(false)}/>
                <Link href={`/${data.catSlug}/${data.slug}`}>
                    <a>
                        <span className="productCard-title">{data.title}</span>
                    </a>
                </Link>
                <div className="productCard-excerpt">
                    {data.presentation}
                </div>

                <div className={`productCard-price ${isOffer ? 'offer' : ''}`}>
                    <span className="price">{currency}{priceToShow.toFixed(2)}</span>
                    {
                        isOffer && (
                            <span className="price promo">{currency}{data.price.toFixed(2)}</span>
                        )
                    }
                </div>
                
                <Buttons openAlert={() => setShowAlert(true)} data={data} cart={inCart} />
            </div>
        </div>
    );
}
 
export default ProductCard;