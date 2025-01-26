"use client"

import AuthForm from "@/components/AuthForm"
import {  signUpSchema } from "@/lib/validations"

const SignInPage = () => {
  return (
    <AuthForm type="SIGN_IN"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    // onSubmit={signUp}
    />
  )
}

export default SignInPage