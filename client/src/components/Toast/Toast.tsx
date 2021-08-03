import { ToastContainer } from 'react-toastify'

export const Toast = () => {
   return (
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        date-testid="toast"
      />
   )
}
