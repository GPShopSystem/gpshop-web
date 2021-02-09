import React, { forwardRef} from 'react';

const Input = forwardRef((props, ref) => {
    const hasError = props?.error?.length > 0
    return ( 
        <div
            className={`field-float ${hasError ? 'error' : ''}`} >
            <input
                {...props}
                placeholder=" "
                ref={ref}
            />
            <label htmlFor={props.id}>{props.placeholder}</label>
            {
                props.error && (
                    <div className="field-float-error">{props.error}</div>
                )
            }
        </div>
     );
})

export default Input;