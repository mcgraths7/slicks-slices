import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    let { value } = e.target;
    if (value.type === 'number') {
      value = parseInt(e.target.value, 10);
    }
    setValues({ ...values, [e.target.name]: value });
  }

  return { values, updateValue };
}
