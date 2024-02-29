import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => {
  return toast(message);
};
const ToastProvider = ({ children }) => {
  return (
    <> 
        <Toaster containerClassName="max-w-[510px]"/>
        {children}
    </>
  );
};

export { notify, ToastProvider };