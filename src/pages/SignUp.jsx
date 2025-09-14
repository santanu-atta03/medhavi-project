import React from 'react'
import signupImg from "../assets/Images/signup.webp"
import Template from '../components/core/auth/Template'


const SignUp = ({accountType, setAccountType}) => {
  return (
    <Template
      title="Join the millions learning to code with Medhavi for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
      accountType={accountType}
      setAccountType = {setAccountType}
    />
  )
}

export default SignUp
