'use client';

import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import Input from "./ui/Input";
import toast from "react-hot-toast";
import Button from "./ui/Button";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/friends')
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if(variant === 'REGISTER') {
       axios.post('/api/register', data)
       .then(()=>signIn('credentials', data))
       .catch(()=>{
        toast.error('Quelque chose s\'est mal passé !')
       })
       .finally(()=>setIsLoading(false))
    }
    if(variant === 'LOGIN') {
      signIn('credentials', {
        redirect: false,
        ...data
      })
      .then((callback)=>{
        if(callback?.error) {
          toast.error('Invalid credentials')
        }
        if(callback?.ok && !callback?.error) {
          toast.success('Connecté !')
          router.push('/friends')
        }
      })
      .finally(()=>setIsLoading(false))
    }

  }

  return ( 
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div 
        className="
        bg-neutral-700
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form 
          className="space-y-6" 
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-center text-xl">Bienvenue sur Suihira !</h1>
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name" 
              label="Surnom"
            />
          )}
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email" 
            label="Adresse email" 
            type="email"
          />
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password" 
            label="Mot de passe" 
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Se connecter' : 'Créer un compte'}
            </Button>
          </div>
        </form>
        <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-neutral-300
          "
        >
          <div>
            {variant === 'LOGIN' ? 'Nouveau sur Suihira?' : 'Vous avez déjà un compte ?'} 
          </div>
          <div 
            onClick={toggleVariant} 
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Créez un compte' : 'Se connecter'}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AuthForm;