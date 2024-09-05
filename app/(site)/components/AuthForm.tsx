'use client';

import {useCallback, useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "../../components/inputs/Input";
import Button from "../../components/Button"
import {loginPost, registerPost} from "@/util/ApiService"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode';


type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register, handleSubmit, formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            registerPost(data).then((res) => {
                toast.success('Register success, the app will opened soon.')
                storeCredential(res.data.token);
            }).catch((error) => {
                notifyCatchedError(error.response.data.message, error.status)
            }).finally(() => {
                if (Cookies.get('token')) {
                    router.push('/conversations');
                }
                setIsLoading(false);
            })
        }

        if (variant === 'LOGIN') {
            loginPost(data).then((res) => {
                toast.success('Login success');
                storeCredential(res.data.access_token);
            }).catch((error) => {
                notifyCatchedError(error.response.data.message, error.status)
            }).finally(() => {
                if (Cookies.get('token')) {
                    router.push('/conversations');
                }
                setIsLoading(false);
            })
        }
    }

    const storeCredential = (token: string) => {
        const decodedToken = jwtDecode(token);
        Cookies.set('token', token, { expires: 1 })
        // @ts-ignore
        localStorage.setItem('id', decodedToken.id)
        // @ts-ignore
        localStorage.setItem('name', decodedToken.name)
        // @ts-ignore
        localStorage.setItem('email', decodedToken.email)
    }

    const notifyCatchedError = (message: any, status: any) => {
        if (message && Array.isArray(message)) {
            message.forEach((msg: string) => {
                toast.error(msg);
            })
        } else {
            toast.error(message);
        }

        if (status === 500) {
            toast.error('Oops, something went wrong');
        }
    }

    useEffect(() => {
        if(Cookies.get('token')) {
            router.push('/conversations');
        }
    }, [router]);

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg m:px-8">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input id="name" disabled={isLoading} label="Name" register={register} errors={errors}/>
                    )}
                    <Input id="email" disabled={isLoading} type="email" label="Email Address" register={register}
                           errors={errors}/>
                    <Input id="password" type="password" disabled={isLoading} label="Password" register={register}
                           errors={errors}/>

                    <div><Button disabled={isLoading} fullWidth={true} type="submit">
                        {variant === 'LOGIN' ? 'Sign In' : 'Register'}
                    </Button></div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2 justify-center">
                        <span className="bg-white px-2 text-gray-500">
                                Coming soon!
                        </span>
                    </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>
                            {variant === 'LOGIN' ? 'New user eh?' : 'Already have an account?'}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === 'LOGIN' ? 'Create an account' : 'Sign In'}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuthForm;