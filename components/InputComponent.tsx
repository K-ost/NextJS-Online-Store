interface IInputComponent {
  type: string
  place: string
  id: string
  error?: string | any
  func: any
}

const InputComponent: React.FC<IInputComponent> = ({ id, place, type, error, func }) => {
  const inputClass = error ? "form-control error" : "form-control"

  return (
    <div className="mb-3">
      {type !== 'area' ? <input
        type={type}
        className={inputClass}
        placeholder={place}
        {...func}
      /> :
      <textarea
        className={inputClass}
        placeholder={place}
        {...func}
      />}
      <div className="invalid-feedback d-block">{error}</div>
    </div>
  )
}

export default InputComponent