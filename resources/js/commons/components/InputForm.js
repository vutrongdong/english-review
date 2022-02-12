import ErrorForm from '@/commons/components/ErrorForm';

const InputForm = ({ value, disabled, handleChange, id, name, placeholder, show = true, label, error, required, type, readonly }) => {
  if (!show) return (<></>);

  return (
    <>
      {label&&
        <label className={required ? 'required' : ''}>{label}</label>
      }
      <input
        value={value || ''}
        disabled={disabled}
        readOnly={readonly}
        onChange={({ target: { value, name } }) => handleChange(value, name)}
        type={type || 'text'}
        id={id}
        className="form-control"
        name={name}
        placeholder={placeholder}
      />
      <ErrorForm error={error} />
    </>
  )
}

export default InputForm