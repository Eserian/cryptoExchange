const customStyles = {
  container: (styles) => ({
    ...styles,
    flexGrow: 1,
  }),
  control: (styles) => ({
    ...styles,
    background: '#F4F4F4',
    border: 'none',
    boxShadow: 'none',
  }),
  menu: (styles) => ({
    ...styles,
    background: '#F4F4F4',
    border: '1px solid #C1D9E6',
    borderRadius: '0 0 5px 5px',
    borderTop: 'none',
    marginTop: '1px',
    boxShadow: 'none',
    boxSizing: 'content-box',
    left: '-1px',
  }),
  indicatorSeparator: () => ({
    display: 'none,',
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? '#EAF1F7' : '#F4F4F4',
    color: isSelected ? 'inherit' : styles.color,
    cursor: 'pointer',
  }),
};

export default customStyles;
