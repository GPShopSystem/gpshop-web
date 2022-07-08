import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { Eye } from 'react-feather'
import * as cartActions from '../redux/actions/cart'

const ButtonFloatingOrder = () => {
  const dispatch = useDispatch();
    const products = useSelector(state => state.cart.list).reduce((a,b) => {
        return a + b.quantity
    }, 0)
    const isEmptyCart = products === 0
    const router = useRouter();
    const availableRoutes =  [
        '/checkout',
        '/cart',
        '/[category]/[product]'
    ]
    const showButton = !availableRoutes.includes(router.pathname)
    const openCart = () => dispatch(cartActions.toggleCart(true))

    const renderButtonProccess = () => {
        const button = (
                <div className={`button-black`}
                    onClick={openCart}
                    >
                    <span className="label"><Eye size={14} style={{ verticalAlign: 'middle'}} /> Ver productos seleccionados</span>
                </div>
        )
        return button
    }

    if(isEmptyCart || !showButton) {
        return <></>
    }
    return ( <div className="floatingButton">
        {renderButtonProccess()}
    </div> );

    return ( <div className="floatingButton">
        {renderButtonProccess()}
    </div> );
}
 
export default ButtonFloatingOrder;