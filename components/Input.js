import React from 'react';

const Input = (props) => {
    return ( 
        <div
            className={"field-float"} >
            <input
                {...props}
                placeholder=" "
            />
            <label htmlFor={props.id}>{props.placeholder}</label>
        </div>
     );
}

export default Input;