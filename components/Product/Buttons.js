import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'react-feather'
import { useDispatch } from 'react-redux'
import * as cartActions from '../../redux/actions/cart'

const Buttons = ({ data, cart, openAlert }) => {
    const [saving, setSaving] = useState(false)
    const [count, setCount] = useState(cart ? cart.quantity : 0)
    const dispatch = useDispatch()

    const showLoader = () => {
        setSaving(true)
        setTimeout(() => {
            setSaving(false)
        }, 1000)
    }

    const manualDispatchUpdate = (q) => {
        dispatch(cartActions.updateCountItemCart({...data, quantity: q}))
    }

    useEffect(() => {
        if(count > 0) manualDispatchUpdate(count)
    },[count]);
    
    useEffect(() => {
        if(cart?.quantity){
            setCount(cart.quantity)
        } else {
            setCount(0)
        }
    }, [cart])

    const addToCart = () => {
        showLoader()
        setCount(count + 1)
    }

    const addToCartFirst = () => {
        if((count + 1) === 1) {
            manualDispatchUpdate(1)
        }
        addToCart()
        openAlert()
    }

    const removeToCart = () => {
        showLoader()
        if(count - 1 === 0) {
            manualDispatchUpdate(0)
        }
        setCount(count - 1)
    }
    
    const onchange = (e) => {
        let value = parseInt(e.target.value.replace(/[^\d]/,''), 10)
        if(isNaN(value)) value = ''
        setCount(value)
    }

    const onBlur = (e) => {
        let value = parseInt(e.target.value.replace(/[^\d]/,''), 10)
        if(isNaN(value)) value = 0
        if(value === 0) {
            manualDispatchUpdate(0)
        }
        setCount(value)
    }

    const renderButtonAddCart = () => (
        <div className="productCard-add" onClick={addToCartFirst}>
            <span className="label">AGREGAR</span>
            <span className="icon increment"><Plus size={14} /></span>
        </div>
    )
    const renderButtonsCount = () => (
        <div className="productCard-count">
            <span className="itemcart-count-update decrement" onClick={removeToCart}><Minus size={14} /></span>
            <span className="itemcart-count-value">
                <input 
                    onBlur={onBlur}
                    onChange={onchange}
                    type="text" 
                    value={count}
                    size="4" />
            </span>
            <span className="itemcart-count-update increment" onClick={addToCart}><Plus size={14} /></span>
            <span className={`loader ${saving ? 'show' : ''}`} />
        </div>
    )
    
    return ( !cart ? renderButtonAddCart() : renderButtonsCount() );
}

Buttons.defaultProps = {
    openAlert: () => {}
}

export default Buttons;

/**
 * 
 * 
 const cartAnimation = (event) => {
    const getClosest = function (elem, selector) {
      for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
      }
      return null;
    };
  
    // start animation block
    let imgToDrag = getClosest(event.target, '.useProduct');
    let viewCart = document.getElementsByClassName('header-right-cart')[0];
    let imgToDragImage = imgToDrag.querySelector('.useImage');
    let imgToDragImageD = imgToDrag.querySelector('.increment');
    
    let disLeft = imgToDragImageD.getBoundingClientRect().left;
    let disTop = imgToDragImageD.getBoundingClientRect().top;
    let cartLeft = viewCart.getBoundingClientRect().left;
    let cartTop = viewCart.getBoundingClientRect().top;
    let image = imgToDragImage.cloneNode(true);
    image.style =
      'z-index: 11111; height: 40px; opacity:1; position:fixed; top:' +
      (disTop - 40) +
      'px;left:' +
      (disLeft) +
      'px;transition: left 1s, top 1s, width 1s, opacity 1s cubic-bezier(1, 1, 1, 1);border-radius: 50px; overflow: hidden; box-shadow: 0 21px 36px rgba(0,0,0,0.1)';
    var reChange = document.body.appendChild(image);
    setTimeout(function () {
      image.style.left = cartLeft + 'px';
      image.style.top = cartTop + 'px';
      image.style.height = '40px';
      image.style.opacity = '0';
    }, 200);
    setTimeout(function () {
      reChange.parentNode.removeChild(reChange);
    }, 1000);
    // End Animation Block
  };
  
 */


  
/**
 * const renderToast = <div className="toast-product">
            <img src={data.image} />
            <div className="toast-product-title">{data.title}</div>
            <div className="toast-product-message">añadido.</div>
        </div>
    
        toast(renderToast, {
            id: 'auto'
        })
 */