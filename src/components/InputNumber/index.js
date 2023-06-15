import { useState } from 'react';

const InputNumber = ({ init, max, onChange, className }) => {
    const [value, setValue] = useState(init || 0);

    const min = 0;
    max = max || 10;

    const change = (e) => {
        const reg = /(^[0-9]{0,2}$)|(^[0-9]{0,2}\.[0-9]{0,5}$)/;

        setValue(e.target.value);

        const n = parseFloat(e.target.value);

        if (e.target.value.trim().length == 0) {
            setValue(n || min);
        }

        if (!reg.test(e.target.value)) {
            setValue(n || min);
        }

        if (n > max) setValue(max || 0);
        if (n < min) setValue(min || 0);

        // if (typeof onChange == 'function') {
        //     onChange(e, value);
        // }
    };

    return (
        <input
            className={className}
            value={value}
            onChange={change}
            onBlur={change}
            onKeyUp={onChange}
        />
    );
};

export default InputNumber;
