import React from 'react'

function Button({
    children,
    type='button',
    bgColor = 'bg-white',
    textColor = 'text-blue-500',
    className = '',
    ...props
}, ref) {
  return (
        <button 
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            type={type}
            {...props}
            ref={ref}
        >
            {children}
        </button>
  )
}

export default Button