import AuthForm from "@/components/AuthForm"
import { signInSchema } from "@/lib/validations"


const SignUpPage = () => {
  return (
    <AuthForm type="SIGN_UP" schema={signInSchema}  
    // onSubmit={() => void} 
    defaultValues={{
      email: "",
      password: "",
    }}
    />
  )
}

export default SignUpPage