import InputForm from "@/components/form/InputForm"
import Link from "next/link"

const SignInPage = () => {
  return (
    <form className="flex flex-col bg-slate-800 gap-2 px-8 py-4 rounded-lg">
      <h1 className="text-2xl font-bold text-center">Connexion</h1>
      <p>Sign-in to your account</p>
      <InputForm key={1} type="text" placeholder="Nom d'utilisateur" name="username" label="Nom d'utilisateur" />
      <InputForm key={2} type="password" placeholder="Mot de passe" name="password" label="Mot de passe" />
      <p>Vous n'avez pas de compte ? <Link href="/sign-up" className="text-blue-400">Sign-up</Link></p>
    </form>
  )
}

export default SignInPage