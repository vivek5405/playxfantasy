// import { lazy, Suspense } from "react";
// import { Routes, Route, HashRouter } from "react-router-dom";
// import { ToastProvider } from "./components/Toast";
// import Spinner from "./components/Loader/Spinner";
// import "./App.css";
// import Cookies from "js-cookie";

// const SplashScreen = lazy(() => import("./pages/SplashScreen"));
// const Boarding = lazy(() => import("./pages/Boarding"));
// //auth related pages
// const EmailLogin = lazy(() => import("./pages/Auth/EmailLogin"));
// const PhoneLogin = lazy(() => import("./pages/Auth/PhoneLogin"));
// const ForgetEmail = lazy(() => import("./pages/Auth/ForgetEmail"));
// const ForgetPhone = lazy(() => import("./pages/Auth/ForgetPhone"));
// const Register = lazy(() => import("./pages/Auth/Register"));
// const Otpverify = lazy(() => import("./pages/Auth/OtpVerify"));
// const RegisterFinal = lazy(() => import("./pages/Auth/RegisterFinal"));
// const Home = lazy(() => import("./components/Home"))

// const Main = lazy(() => import("./pages/Main"));
// // const token = Cookies.get('token')
// const token = localStorage.getItem('token');
// function App() {

//   return (
//     <div className="app-main min-h-[100svh] grid grid-cols-1 lg:grid-cols-2 lg:p-[10px]">
//       <div className="main-content-wrapper lg:rounded-xl lg:shadow-md bg-[#161720]">
//           <HashRouter>
//             <Suspense fallback={<Spinner open={true}/>}>
//               {token ? (
//                 <Routes>
//                   <Route path="*" element={<Main />} />
//                   {/* <Route path="/" element={<SplashScreen />} /> */}
//                   <Route index={true} path="/" element={<Main />} />
//                   <Route  path="/home" element={<Home />} />
//                 </Routes>
//               ) : (
//                 <Routes>
//                   <Route path="*" element={<Boarding />} />
//                   <Route index={true} path="/" element={<Boarding />} />
//                   <Route path="/email-login" element={<EmailLogin/>} />
//                   <Route path="/phone-login" element={<PhoneLogin/>} />
//                   <Route path="/forget-email" element={<ForgetEmail/>} />
//                   <Route path="/forget-phone" element={<ForgetPhone/>} />
//                   <Route path="/register" element={<Register/>} />
//                   <Route path="/verify-otp" element={<Otpverify/>} />
//                   <Route path="/register-final" element={<RegisterFinal/>} />
//                 </Routes>
//               )}
//             </Suspense>
//           </HashRouter>
//         </div>
//         <div className="right-content-wrapper hidden lg:block">
//           app
//         </div>
//       </div>
   
//   );
// }

// export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Cookies } from "react-cookie";
import Boarding from "./pages/Boarding";
// auth related pages
import EmailLogin from "./pages/Auth/EmailLogin";
import PhoneLogin from "./pages/Auth/PhoneLogin";
import ForgetEmail from "./pages/Auth/ForgetEmail";
import ForgetPhone from "./pages/Auth/ForgetPhone";
import Register from "./pages/Auth/Register";
import Otpverify from "./pages/Auth/OtpVerify";
import RegisterFinal from "./pages/Auth/RegisterFinal";
import Home from "./components/Home";
import Main from "./pages/Main";
import Contest from "./pages/Contest";
import Test from "./pages/Test";
import ContestDetail from "./pages/Contest Detail/page";
import { useCookies } from 'react-cookie';
import CreateTeam from "./pages/CreateTeam";
function App() {
   //const token = 1; // Replace with your actual logic to check for authentication
  //  let token;

  const [cookies] = useCookies(['accessToken']);
  const token = cookies.accessToken || null;
  return (
  
       <BrowserRouter>
      <Routes>
        {token ? (
          <>
            <Route path="*" element={<Main />} />
            <Route index={true} path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contest/:game/:mid" element={<Contest />} />
            <Route path="/test" element={<Test />} />
            <Route path="/contest-details" element={<ContestDetail />} />
            <Route path="/create-team" element={<CreateTeam />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Boarding />} />
            <Route index={true} path="/" element={<Boarding />} />
            <Route path="/email-login" element={<EmailLogin />} />
            <Route path="/phone-login" element={<PhoneLogin />} />
            <Route path="/forget-email" element={<ForgetEmail />} />
            <Route path="/forget-phone" element={<ForgetPhone />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<Otpverify />} />
            <Route path="/register-final" element={<RegisterFinal />} />
          </>
        )}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
