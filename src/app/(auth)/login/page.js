'use client';
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthSessionStatus from '@/lib/AuthSessionStatus';

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    },[router.reset, errors.length]);

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <div className="login-box">
            <div className="login-logo">
                <b>DOOKAN</b>
            </div>
            {/* /.login-logo */}
            <div className="login-box-body">
            <AuthSessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div className="form-group has-feedback">
                    <input type="email" className="form-control" placeholder="Email" required
                           onChange={e => setEmail(e.target.value)}
                    />
                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                </div>

                {/* Password */}
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" placeholder="Password" required
                           onChange={e => setPassword(e.target.value)}
                    />
                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>

                {/* Remember Me */}
                <div className="row">
                    <label htmlFor="remember_me" className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login
