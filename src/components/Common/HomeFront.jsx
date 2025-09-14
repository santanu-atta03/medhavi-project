import React from 'react';
import { Link } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../utils/constants';

// export default function HomeFront() {
//   return (
//     <>
//       {/* Animated Background */}
//       <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#182fc8] via-[#ac1657] to-[#ad7f1c] overflow-hidden homefrontbody">
//         <div className="absolute w-full h-full overflow-hidden">
//           {[
//             { left: '10%', delay: '0s', text: 'const learn = () => {' },
//             { left: '20%', delay: '2s', text: "import React from 'react'" },
//             { left: '30%', delay: '4s', text: 'function Code() {' },
//             { left: '40%', delay: '6s', text: '<div className="app">' },
//             { left: '50%', delay: '8s', text: "console.log('Hello')" },
//             { left: '60%', delay: '10s', text: 'npm install success' },
//             { left: '70%', delay: '12s', text: 'git commit -m "learned"' },
//             { left: '80%', delay: '14s', text: '// Build your future' },
//             { left: '90%', delay: '16s', text: 'return <Success />' },
//           ].map(({ left, delay, text }, i) => (
//             <span
//               key={i}
//               className="text-[14px] font-mono text-cyan-400 opacity-10 absolute animate-float"
//               style={{
//                 left,
//                 animationDelay: delay,
//               }}
//             >
//               {text}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Header */}
//       {/* <header className="fixed top-0 w-full px-[5%] py-5 bg-[rgba(10,14,39,0.8)] backdrop-blur-md z-50 transition-all ease-out duration-300">
//         <nav className="flex justify-between items-center">
//           <div className="flex items-center gap-2.5 text-white font-bold text-2xl select-none">
//             <div
//               className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] bg-gradient-to-br from-yellow-400 via-orange-500 to-orange-600 animate-pulse"
//               aria-label="logo icon"
//             >
//               💡
//             </div>
//             <span>Medhavi</span>
//           </div>
//           <ul className="hidden md:flex gap-10 text-white list-none">
//             <li>
//               <a
//                 href="#home"
//                 className="relative transition-colors duration-300 hover:text-cyan-400 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#courses"
//                 className="relative transition-colors duration-300 hover:text-cyan-400 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 Courses
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#about"
//                 className="relative transition-colors duration-300 hover:text-cyan-400 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#contact"
//                 className="relative transition-colors duration-300 hover:text-cyan-400 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 Contact
//               </a>
//             </li>
//           </ul>
//           <div className="flex gap-4">
//             <button className="btn-login bg-white bg-opacity-10 border border-white border-opacity-30 text-white rounded-full px-6 py-2.5 font-semibold text-base hover:bg-opacity-20 hover:-translate-y-[2px] transition-transform duration-300">
//               Log in
//             </button>
//             <button className="btn-signup bg-gradient-to-br from-cyan-400 to-green-400 text-[#0a0e27] rounded-full px-6 py-2.5 font-semibold text-base hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(0,212,255,0.4)] transition-transform duration-300">
//               Sign Up →
//             </button>
//           </div>
//         </nav>
//       </header> */}

//       {/* Instructor Badge */}
//       <div className="top-[40px] absolute right-8 bg-gradient-to-br from-orange-500 via-yellow-400 to-yellow-300 text-white px-6 py-3 rounded-full font-semibold cursor-pointer z-50 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,107,53,0.4)] select-none animate-slideInRight">
//         🎓 Become an Instructor →
//       </div>

//       {/* Hero Section */}
//       <section className="min-h-screen  pb-[50px] px-[5%] flex flex-col md:flex-row items-center relative z-10 homefronthero">
//         <div className="max-w-[1400px] w-full  mx-auto grid  md:grid-cols-2  gap-16 items-center">
//           <div className="hero-text z-20">
//             <span className="inline-block mb-10 rounded-full border border-cyan-400 bg-cyan-400 bg-opacity-10 px-5 py-2 text-cyan-400 text-sm animate-slideInLeft">
//               🚀 #1 Platform for Tech Education
//             </span>
//             <h1 className="mb-12 text-[3.8rem] leading-[1.2] animate-slideInLeft font-semibold">
//               Empower your future with{' '}
//               <span className="inline-block text-transparent bg-gradient-to-tr from-cyan-400 via-green-400 to-orange-500 bg-clip-text animate-gradientHue">
//                 Coding Skills
//               </span>
//             </h1>
//             <p className="mb-8 text-lg leading-relaxed text-white text-opacity-80 animate-slideInLeft">
//               With our online coding courses, you can learn at your own pace, from anywhere
//               in the world, and get access to a wealth of resources, including hands-on
//               projects, quizzes, and personalized feedback from instructors.
//             </p>
//             <div className="flex gap-10 mb-10 animate-slideInLeft">
//               {/* Stats */}
//               <div className="flex flex-col">
//                 <span className="text-3xl font-bold text-cyan-400">10,000+</span>
//                 <span className="text-sm text-white text-opacity-60">Active Students</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-3xl font-bold text-cyan-400">150+</span>
//                 <span className="text-sm text-white text-opacity-60">Expert Instructors</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-3xl font-bold text-cyan-400">98%</span>
//                 <span className="text-sm text-white text-opacity-60">Success Rate</span>
//               </div>
//             </div>
//             <div className="flex gap-5 animate-slideInLeft">
//               <Link className="btn-primary relative overflow-hidden px-9 py-4 rounded-[30px] font-bold text-base text-[#0a0e27] bg-gradient-to-br from-yellow-400 to-orange-500 hover:shadow-[0_15px_40px_rgba(255,215,0,0.4)] hover:-translate-y-1 transition-transform duration-300" to={"/signup"}>
//                 Start Learning Free →
//                 <span className="absolute top-0 left-[-100%] w-full h-full bg-white bg-opacity-30 transition-left duration-500 group-hover:left-full"></span>
//               </Link>
//               <Link className="btn-secondary px-9 py-4 rounded-[30px] font-bold text-base text-white border-2 border-white border-opacity-30 bg-transparent hover:bg-white hover:bg-opacity-10 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300" to={"/login"}>
//                 📅 Book a Demo
//               </Link>
//             </div>
//           </div>
//           <div className="hero-visual animate-slideInRight w-[30%]  absolute right-[15%] bottom-[40%]">
//             <div className="bg-[rgba(30,35,55,0.9)] rounded-[15px] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-md border border-white border-opacity-10 font-mono text-[14px] leading-[2]">
//               <div className="flex gap-2.5 mb-5">
//                 <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
//                 <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
//                 <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
//               </div>
//               <div>
//                 <div className="opacity-0 animate-typeIn animate-delay-500">
//                   <span className="text-orange-600">import</span>{' '}
//                   <span className="text-cyan-400">React</span>{' '}
//                   <span className="text-orange-600">from</span>{' '}
//                   <span className="text-green-400">'react'</span>;
//                 </div>
//                 <div className="opacity-0 animate-typeIn animate-delay-700">
//                   <span className="text-orange-600">import</span> {'{ '}
//                   <span className="text-cyan-400">Success</span> {'} '}
//                   <span className="text-orange-600">from</span>{' '}
//                   <span className="text-green-400">'./future'</span>;
//                 </div>
//                 <div className="opacity-0 animate-typeIn animate-delay-900">&nbsp;</div>
//                 <div className="opacity-0 animate-typeIn animate-delay-[1100ms]">
//                   <span className="text-orange-600">function</span>{' '}
//                   <span className="text-cyan-400">LearnWithMedhavi</span>() {'{'}
//                 </div>
//                 <div className="opacity-0 animate-typeIn animate-delay-[1300ms]">
//                   &nbsp;&nbsp;<span className="text-orange-600">return</span>{' '}
//                   &lt;<span className="text-cyan-400">Success</span>{' '}
//                   <span className="text-orange-600">unlimited</span>=
//                   <span className="text-green-400">{'{true}'}</span> /&gt;;
//                 </div>
//                 <div className="opacity-0 animate-typeIn animate-delay-[1500ms]">{'}'}</div>
//                 <div className="opacity-0 animate-typeIn animate-delay-[1700ms] text-gray-500">// Start your coding journey today! 🚀</div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Feature Cards */}
//         <div className="absolute bottom-[50px] left-[70%] transform -translate-x-1/2 flex gap-7 z-30  md:mt-12 flex-row">
//           <div className="feature-card bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 p-6 rounded-lg min-w-[250px] transition-all ease-in-out duration-300 hover:-translate-y-2.5 hover:bg-opacity-10 hover:shadow-[0_20px_40px_rgba(0,212,255,0.2)] animate-slideUp">
//             <div className="text-3xl mb-4">💻</div>
//             <div className="text-cyan-400 text-lg mb-2">Interactive Learning</div>
//             <div className="text-white text-opacity-70 text-sm">
//               Code in real-time with our interactive playground
//             </div>
//           </div>
//           <div className="feature-card bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 p-6 rounded-lg min-w-[250px] transition-all ease-in-out duration-300 hover:-translate-y-2.5 hover:bg-opacity-10 hover:shadow-[0_20px_40px_rgba(0,212,255,0.2)] animate-slideUp">
//             <div className="text-3xl mb-4">🎯</div>
//             <div className="text-cyan-400 text-lg mb-2">Project-Based</div>
//             <div className="text-white text-opacity-70 text-sm">Build real projects that matter for your portfolio</div>
//           </div>
//           <div className="feature-card bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 p-6 rounded-lg min-w-[250px] transition-all ease-in-out duration-300 hover:-translate-y-2.5 hover:bg-opacity-10 hover:shadow-[0_20px_40px_rgba(0,212,255,0.2)] animate-slideUp">
//             <div className="text-3xl mb-4">🏆</div>
//             <div className="text-cyan-400 text-lg mb-2">Get Certified</div>
//             <div className="text-white text-opacity-70 text-sm">Industry-recognized certificates upon completion</div>
//           </div>
//         </div>
//       </section>

//       {/* Tailwind Animations */}
//       <style>{`
//         @keyframes float {
//           0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
//           10%, 90% { opacity: 0.3; }
//           100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
//         }
//         .animate-float {
//           animation: float 20s linear infinite;
//         }
//         @keyframes pulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
//         .animate-pulse {
//           animation: pulse 2s infinite;
//         }
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slideInLeft {
//           animation: slideInLeft 0.8s ease forwards;
//         }
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slideInRight {
//           animation: slideInRight 1s ease forwards;
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slideUp {
//           animation: slideUp 1.5s ease forwards;
//         }
//         @keyframes typeIn {
//           to { opacity: 1; }
//         }
//         .animate-typeIn {
//           animation: typeIn 0.5s ease forwards;
//         }
//         .animate-delay-500 { animation-delay: 0.5s; }
//         .animate-delay-700 { animation-delay: 0.7s; }
//         .animate-delay-900 { animation-delay: 0.9s; }
//         .animate-delay-[1100ms] { animation-delay: 1.1s; }
//         .animate-delay-[1300ms] { animation-delay: 1.3s; }
//         .animate-delay-[1500ms] { animation-delay: 1.5s; }
//         .animate-delay-[1700ms] { animation-delay: 1.7s; }
//         @keyframes gradientHue {
//           0%, 100% { filter: hue-rotate(0deg); }
//           50% { filter: hue-rotate(30deg); }
//         }
//         .animate-gradientHue {
//           animation: gradientHue 3s ease infinite;
//         }
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slideInRight {
//           animation: slideInRight 1s ease forwards;
//         }
//       `}</style>

//       {/* Smooth scroll script */}
//       <script
//         dangerouslySetInnerHTML={{
//           __html: `
//           document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//             anchor.addEventListener('click', function (e) {
//               e.preventDefault();
//               const target = document.querySelector(this.getAttribute('href'));
//               if(target) {
//                 target.scrollIntoView({ behavior: 'smooth' });
//               }
//             });
//           });

//           document.querySelectorAll('.btn, .feature-card').forEach(element => {
//             element.addEventListener('mouseenter', function() {
//               this.style.transform = 'translateY(-5px) scale(1.02)';
//             });
//             element.addEventListener('mouseleave', function() {
//               this.style.transform = 'translateY(0) scale(1)';
//             });
//           });
//         `,
//         }}
//       />
//     </>
//   );
// }



export default function HomeFront({setAccountType}) {
  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#182fc8] via-[#ac1657] to-[#ad7f1c] overflow-hidden homefrontbody">
        <div className="absolute w-full h-full overflow-hidden">
          {[
            { left: '10%', delay: '0s', text: 'const learn = () => {' },
            { left: '20%', delay: '2s', text: "import React from 'react'" },
            { left: '30%', delay: '4s', text: 'function Code() {' },
            { left: '40%', delay: '6s', text: '<div className="app">' },
            { left: '50%', delay: '8s', text: "console.log('Hello')" },
            { left: '60%', delay: '10s', text: 'npm install success' },
            { left: '70%', delay: '12s', text: 'git commit -m "learned"' },
            { left: '80%', delay: '14s', text: '// Build your future' },
            { left: '90%', delay: '16s', text: 'return <Success />' },
          ].map(({ left, delay, text }, i) => (
            <span
              key={i}
              className="text-[14px] font-mono text-cyan-400 opacity-10 absolute animate-float"
              style={{
                left,
                animationDelay: delay,
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Instructor Badge */}
      <Link className="top-[16px] mt-8 md:mt-0 mb-5 md:top-[40px] absolute right-4 md:right-8 bg-gradient-to-br from-orange-500 via-yellow-400 to-yellow-300 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold cursor-pointer z-50 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,107,53,0.4)] select-none animate-slideInRight text-sm md:text-base" to={"/signup"} onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>
        🎓 Become an Instructor →
      </Link>

      {/* Hero Section */}
      <section className="min-h-screen pb-8 px-4 md:px-[5%] flex flex-col  items-center relative z-10 homefronthero">
        <div className="container  max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="hero-text z-20 w-full">
            <span className="inline-block mb-5 mt-2 md:mt-0 md:mb-10 rounded-full border border-cyan-400 bg-cyan-400 bg-opacity-10 px-4 md:px-5 py-1.5 md:py-2 text-cyan-400 text-xs md:text-sm animate-slideInLeft">
              🚀 #1 Platform for Tech Education
            </span>
            <h1 className="mb-6 mt-9 md:mt-0 md:mb-12 text-[2.2rem] xs:text-[2.6rem] sm:text-[3rem] md:text-[3.8rem] leading-[1.2] animate-slideInLeft font-semibold">
              Empower your future with{' '}
              <span className="inline-block text-transparent bg-gradient-to-tr from-cyan-400 via-green-400 to-orange-500 bg-clip-text animate-gradientHue">
                Coding Skills
              </span>
            </h1>
            <p className="mb-5 md:mb-8 text-base md:text-lg leading-relaxed text-white/80 animate-slideInLeft">
              With our online coding courses, you can learn at your own pace, from anywhere
              in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </p>
            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-5 md:mb-10 animate-slideInLeft">
              <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                <span className="text-xl md:text-3xl font-bold text-cyan-400">10,000+</span>
                <span className="text-xs md:text-sm text-white text-opacity-60">Active Students</span>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                <span className="text-xl md:text-3xl font-bold text-cyan-400">150+</span>
                <span className="text-xs md:text-sm text-white text-opacity-60">Expert Instructors</span>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                <span className="text-xl md:text-3xl font-bold text-cyan-400">98%</span>
                <span className="text-xs md:text-sm text-white text-opacity-60">Success Rate</span>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3   md:gap-5 animate-slideInLeft w-full sm:w-auto">
              <Link className="btn-primary relative overflow-hidden px-6 py-3 md:px-9 md:py-4 rounded-[30px] font-bold text-base text-[#0a0e27] bg-gradient-to-br from-yellow-400 to-orange-500 hover:shadow-[0_15px_40px_rgba(255,215,0,0.4)] hover:-translate-y-1 transition-transform duration-300 block text-center" to={"/signup"}>
                Start Learning Free →
                <span className="absolute top-0 left-[-100%] w-full h-full bg-white bg-opacity-30 transition-left duration-500 group-hover:left-full"></span>
              </Link>
              <Link className="btn-secondary px-6 py-3 md:px-9 md:py-4 rounded-[30px] font-bold text-base text-white border-2 border-white border-opacity-30 bg-transparent hover:bg-white hover:bg-opacity-10 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 block text-center" to={"/login"}>
                📅 Book a Demo
              </Link>
            </div>
          </div>
          {/* Code Editor Visual */}
          <div className="hero-visual animate-slideInRight w-full md:w-[39%] flex justify-center md:justify-end relative md:absolute mt-8 md:mt-0 md:right-[15%]">
            <div className="bg-[rgba(30,35,55,0.9)] rounded-[15px] p-3 md:p-5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-md border border-white border-opacity-10 font-mono text-[13px] md:text-[14px] leading-[2] w-[97vw] max-w-[370px] md:max-w-[380px] min-w-0">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div>
                <div className="opacity-0 animate-typeIn animate-delay-500">
                  <span className="text-orange-600">import</span>{' '}
                  <span className="text-cyan-400">React</span>{' '}
                  <span className="text-orange-600">from</span>{' '}
                  <span className="text-green-400">'react'</span>;
                </div>
                <div className="opacity-0 animate-typeIn animate-delay-700">
                  <span className="text-orange-600">import</span> {'{ '}
                  <span className="text-cyan-400">Success</span> {'} '}
                  <span className="text-orange-600">from</span>{' '}
                  <span className="text-green-400">'./future'</span>;
                </div>
                <div className="opacity-0 animate-typeIn animate-delay-900">&nbsp;</div>
                <div className="opacity-0 animate-typeIn animate-delay-[1100ms]">
                  <span className="text-orange-600">function</span>{' '}
                  <span className="text-cyan-400">LearnWithMedhavi</span>() {'{'}
                </div>
                <div className="opacity-0 animate-typeIn animate-delay-[1300ms]">
                  &nbsp;&nbsp;<span className="text-orange-600">return</span>{' '}
                  &lt;<span className="text-cyan-400">Success</span>{' '}
                  <span className="text-orange-600">unlimited</span>=
                  <span className="text-green-400">{'{true}'}</span> /&gt;;
                </div>
                <div className="opacity-0 animate-typeIn animate-delay-[1500ms]">{'}'}</div>
                <div className="opacity-0 animate-typeIn animate-delay-[1700ms] text-gray-500">// Start your coding journey today! 🚀</div>
              </div>
            </div>
          </div>
        </div>
        {/* Feature Cards */}
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-7 mt-8 md:mt-12 justify-center items-center relative">
          <div className="feature-card bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 p-4 md:p-6 rounded-lg w-full max-w-[300px] min-w-0 transition-all ease-in-out duration-300 hover:-translate-y-2.5 hover:bg-opacity-10 hover:shadow-[0_20px_40px_rgba(0,212,255,0.2)] animate-slideUp">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">💻</div>
            <div className="text-cyan-400 text-base md:text-lg mb-1 md:mb-2">Interactive Learning</div>
            <div className="text-white text-opacity-70 text-xs md:text-sm">
              Code in real-time with our interactive playground
            </div>
          </div>
          <div className="feature-card bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 p-4 md:p-6 rounded-lg w-full max-w-[300px] min-w-0 transition-all ease-in-out duration-300 hover:-translate-y-2.5 hover:bg-opacity-10 hover:shadow-[0_20px_40px_rgba(0,212,255,0.2)] animate-slideUp">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">🎯</div>
            <div className="text-cyan-400 text-base md:text-lg mb-1 md:mb-2">Project-Based</div>
            <div className="text-white text-opacity-70 text-xs md:text-sm">Build real projects that matter for your portfolio</div>
          </div>
          <div className="feature-card bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 p-4 md:p-6 rounded-lg w-full max-w-[300px] min-w-0 transition-all ease-in-out duration-300 hover:-translate-y-2.5 hover:bg-opacity-10 hover:shadow-[0_20px_40px_rgba(0,212,255,0.2)] animate-slideUp">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">🏆</div>
            <div className="text-cyan-400 text-base md:text-lg mb-1 md:mb-2">Get Certified</div>
            <div className="text-white text-opacity-70 text-xs md:text-sm">Industry-recognized certificates upon completion</div>
          </div>
        </div>
      </section>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10%, 90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float 20s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease forwards;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 1s ease forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 1.5s ease forwards;
        }
        @keyframes typeIn {
          to { opacity: 1; }
        }
        .animate-typeIn {
          animation: typeIn 0.5s ease forwards;
        }
        .animate-delay-500 { animation-delay: 0.5s; }
        .animate-delay-700 { animation-delay: 0.7s; }
        .animate-delay-900 { animation-delay: 0.9s; }
        .animate-delay-[1100ms] { animation-delay: 1.1s; }
        .animate-delay-[1300ms] { animation-delay: 1.3s; }
        .animate-delay-[1500ms] { animation-delay: 1.5s; }
        .animate-delay-[1700ms] { animation-delay: 1.7s; }
        @keyframes gradientHue {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(30deg); }
        }
        .animate-gradientHue {
          animation: gradientHue 3s ease infinite;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 1s ease forwards;
        }
      `}</style>
    </>
  );
}
