import React from 'react';

const useInput = (initialValue) => {

    const [value, setValue] = React.useState(initialValue)

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return { value, onChange }
}

export default useInput;