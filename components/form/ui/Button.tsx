interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  const secondaryStyle = 'bg-gray-500'
  return ( 
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        flex 
        justify-center 
        rounded-md 
        px-3 
        py-2 
        text-sm 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        ${secondary ? secondaryStyle : 'bg-indigo-700'}
        `}
    >
      {children}
    </button>
   );
}
 
export default Button;