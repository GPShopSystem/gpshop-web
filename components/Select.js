import React, { forwardRef} from 'react';

const Select = forwardRef((props, ref) => {
    const hasError = props?.error?.length > 0
    const getProps = {...props}
    delete getProps.options
    delete getProps.idOption
    delete getProps.labelOption
    return ( 
        <div
            className={`field-float ${hasError ? 'error' : ''}`} >
            <select 
                {...getProps}
                placeholder=" "
                ref={ref}
            >
                <option disabled selected value=""> -- Seleccionar -- </option>
                {
                    props.options.map(op => <option key={op[props.idOption]} value={op[props.idOption]}>{op[props.labelOption]}</option>) 
                }
            </select>
            <label htmlFor={props.id}>{props.placeholder}</label>
            {
                props.error && (
                    <div className="field-float-error">{props.error}</div>
                )
            }
        </div>
     );
})

Select.defaultProps = {
    idOption: 'id',
    labelOption: 'value',
    options: []
}
 
export default Select;
