/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const ErrorMessage = ( {children} ) => {
  return (
    <div
      className="w-full bg-red-800 text-white mt-2 text-center uppercase rounded-md font-normal"
    >
      <p>{ children }</p>
    </div>
  )
}

export default ErrorMessage