import styled from 'styled-components';

const StyledOrderForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  fieldset {
    display: grid;
    grid-column: span 2;
    gap: 1rem;
    max-height: 60rem;
    overflow: auto;
    align-content: start;
    &.order,
    &.menu {
      grid-column: span 1;
    }
  }
  .mapleSyrup {
    display: none;
  }
  @media (max-width: 900px) {
    fieldset.order,
    fieldset.menu {
      grid-column: span 2;
    }
  }
`;

export default StyledOrderForm;
