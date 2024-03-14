// import { useState } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [email, setEmail] = useState('');
//   const [otp, setOTP] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/register', { email });
//       setMessage(response.data.message);
//     } catch (error:any) {
//       setMessage(error.response.data.error);
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/verify', { email, otp });
//       setMessage(response.data.message);
//     } catch (error:any) {
//       setMessage(error.response.data.error);
//     }
//   };

//   return (
//     <div>
//       <h1>Email Verification</h1>
//       <form onSubmit={handleSendOTP}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">Send OTP</button>
//       </form>

//       <form onSubmit={handleVerifyOTP}>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOTP(e.target.value)}
//         />
//         <button type="submit">Verify OTP</button>
//       </form>

//       <p>{message}</p>
//     </div>
//   );
// }


import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isOtpSent) {
        // Verify OTP
        const response = await axios.post('/api/verify', { email, otp });
        setMessage(response.data.message);
      } else {
        // Generate OTP
        const response = await axios.post('/api/register', { email });
        setMessage(response.data.message);
        setIsOtpSent(true);
      }
    } catch (error:any) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isOtpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        )}
        <button type="submit">
          {isOtpSent ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
