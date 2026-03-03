"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/app/actions/auth';

export default function LoginPage() {
 const router = useRouter();
 const [error, setError] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
 e.preventDefault();
 setError(null);
 setIsLoading(true);
 const formData = new FormData(e.currentTarget);

 const result = await loginAction(formData);
 if (result?.error) {
 setError(result.error);
 setIsLoading(false);
 } else if (result?.success) {
 router.push('/admin');
 }
 }
 return (
 <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4">
 <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200 ">
 <div className="p-8 md:p-12">
 <div className="flex flex-col items-center mb-8">
 <div className="flex items-center gap-3 text-primary mb-4">
 <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
 <svg className="size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
 <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
 </svg>
 </div>
 <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight">RI Service</h2>
 </div>
 <p className="text-slate-600 text-base">Welcome back to RI Service</p>
 </div>
 <form onSubmit={handleSubmit} className="space-y-6">
 <div>
 <label className="block text-slate-900 text-sm font-semibold mb-2" htmlFor="email">
 Email
 </label>
 <input name="email" required className="block w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 text-base focus:border-primary focus:ring-primary placeholder:text-slate-400 transition-all" id="email" placeholder="Enter your email" type="email" />
 </div>
 <div>
 <div className="flex items-center justify-between mb-2">
 <label className="block text-slate-900 text-sm font-semibold" htmlFor="password">
 Password
 </label>
 <a className="text-primary text-sm font-medium hover:underline" href="#">
 Forgot password?
 </a>
 </div>
 <div className="relative">
 <input name="password" required className="block w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 pr-12 text-base focus:border-primary focus:ring-primary placeholder:text-slate-400 transition-all" id="password" placeholder="Enter your password" type="password" />
 <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 " type="button">
 <span className="material-symbols-outlined text-[22px]">visibility</span>
 </button>
 </div>
 </div>
 <div className="flex items-center">
 <input className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" id="remember" type="checkbox" />
 <label className="ml-2 block text-sm text-slate-600 " htmlFor="remember">
 Keep me logged in
 </label>
 </div>
 {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
 <button disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:active:scale-100" type="submit">
 {isLoading ? 'Logging in...' : 'Login'}
 </button>
 </form>
 <div className="mt-8 text-center">
 <p className="text-slate-600 text-sm">
 Don't have an account?
 <a className="text-primary font-semibold hover:underline ml-1" href="#">Sign up for free</a>
 </p>
 </div>
 </div>
 <div className="bg-slate-50 px-6 md:px-8 py-4 border-t border-slate-100 flex flex-wrap justify-center gap-4 md:gap-6">
 <a className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="#">Privacy Policy</a>
 <a className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="#">Terms of Service</a>
 <a className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="#">Help Center</a>
 </div>
 </div>
 <div className="mt-8 flex items-center gap-2 opacity-40">
 <span className="text-slate-500 text-sm">© 2024 RI Service Corporation</span>
 </div>
 </div>
 );
}
