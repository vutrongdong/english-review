import ErrorForm from '@/commons/components/ErrorForm';

const SelectForm = ({ value, disabled, handleChange, id, name, show = true, label, error, required, showOptionBlank = true, options }) => {
  if (!show) return (<></>);

  return (
    <>
      {label&&
        <label className={required ? 'required' : ''}>{label}</label>
      }
      <select
        name={name}
        className="form-control"
        id={id}
        value={value || ""}
        disabled={disabled}
        onChange={({ target: { value, name } }) => handleChange(value, name)}
      >
        {showOptionBlank && <option value=""></option>}
        {options}
      </select>
      <ErrorForm error={error} />
    </>
  )
}

export default SelectForm