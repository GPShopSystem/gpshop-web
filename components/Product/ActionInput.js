import React from 'react';
import { useState } from 'react';
import { Plus, Minus } from 'react-feather'

const ActionInput = () => {
    const [count, setCount] = useState(0)
    const onchange = (e) => {
        setCount(e.target.value.replace(/[^\d]/,''))
    }

    const onAddMore = () => {
        const current = parseInt(count, 10)
        if (current + 1 > 99) return
        const newQty = current + 1
        const formatQty = newQty
        setCount(formatQty)
    }

    const onMinus = () => {
        const current = parseInt(count, 10)
        if (current - 1 < 0) return
        const newQty = current - 1
        const formatQty = newQty
        setCount(formatQty)
    }
    

    return ( 
    <div className="actionInput">
        <div className="actionInput-input">
            <input 
                onChange={onchange}
                type="text" 
                value={count}
                size="4" />
            <div className="actionInput-input-actions">
                <div className="actionInput-input-actions-add" onClick={onAddMore}><Plus size={14} /></div>
                <div className="actionInput-input-actions-minus" onClick={onMinus}><Minus size={14} /></div>
            </div>
        </div>
        <div className="actionInput-button">AÑADIR</div>
    </div> );
}
 
export default ActionInput;