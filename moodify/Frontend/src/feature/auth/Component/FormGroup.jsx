import React from 'react';
import '../styles/formGroup.scss';

const FormGroup = ({ label, type, name, placeholder, required, value, onChange }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                value={value}
                onChange={onChange}
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default FormGroup;
