import React from 'react';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { Eye } from 'react-feather'

const ButtonFloatingOrder = () => {
    const products = useSelector(state => state.cart.list).reduce((a,b) => {
        return a + b.quantity
    }, 0)
    const isEmptyCart = products === 0
    const router = useRouter();
    const availableRoutes =  [
        '/checkout',
        '/cart'
    ]
    const showButton = !availableRoutes.includes(router.pathname)

    const renderButtonProccess = () => {
        const button = (
                <div className={`button-black`}
                    onClick={() => {
                        router.push('/cart').then(() => window.scrollTo(0, 0));
                    }}
                    >
                    <span className="label"><Eye size={14} style={{ verticalAlign: 'middle'}} /> {products} productos seleccionados</span>
                </div>
        )
        return button
    }

    if(isEmptyCart || !showButton) {
        return <></>
    }
    return ''

    return ( <div className="floatingButton">
        {renderButtonProccess()}
    </div> );
}
 
export default ButtonFloatingOrder;