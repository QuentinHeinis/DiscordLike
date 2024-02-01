'use client'
type InputType = {
  type: 'text' | 'email' | 'password',
  name: string,
  placeholder: string,
  label?: string
}
const InputForm = ({type, name, placeholder, label} : InputType) => {
  return (
    <label className="flex flex-col">
      {label && <span>{label}</span>}
      <input type={type} name={name} placeholder={placeholder}/>
    </label>
  )
}

export default InputForm