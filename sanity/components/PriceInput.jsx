/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatch = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const centsPerDollar = 100;

class PriceInput extends React.Component {
  focus() {
    this._inputElement.focus();
  }

  render() {
    const { type, value, onChange } = this.props;
    const { title, description, name } = type;
    return (
      <div>
        <h2>
          {title} {value && `- ${formatMoney(value / centsPerDollar)}`}
        </h2>
        <p>{description}</p>
        <input
          type={name}
          value={value}
          onChange={(e) => onChange(createPatch(e.target.value))}
          ref={(element) => (this._inputElement = element)}
        />
      </div>
    );
  }
}

export default PriceInput;
