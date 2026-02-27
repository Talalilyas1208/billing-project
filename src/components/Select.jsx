import React from 'react';
import ReactSelect from 'react-select';

const Select = ({ value, options, onChange, placeholder = "Select...", name }) => {
  

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? 'black' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': {
        borderColor: 'black',
      },
    }),
  };

  const selectedOption = options?.find(opt => opt.value === value) || null;

  return (
    <div className="select-group" style={{ marginTop: '25px', width: '14%' }}>
     
        <label htmlFor={name} style={{ display: 'block', fontSize: '14px', fontWeight: '500' }}>

        </label>
     
      
      <ReactSelect
        id={name}
        instanceId={name}
        options={options}
        value={selectedOption}
        placeholder={placeholder}
        onChange={(val) => onChange(val.value)} 
        styles={customStyles}
        isSearchable={true} 
      />
    </div>
  );
};

export default Select;