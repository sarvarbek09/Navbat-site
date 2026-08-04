import { Button } from "@/components/ui/button"
import Link from "next/link"

const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen">
            <div className="flex flex-col *:**:items-center justify-center mb-3">
                <h3 className="text-lg text-[#3525CD] font-semibold">SalonFlow</h3>
                <h2 className="text-4xl font-bold mb-4">Welcome back</h2>
                <p className="text-lg font-light mb-4">Enter your details to access your wellness dashboard.</p>
            </div>
            <div className="w-full mb-4">
                <Link href="/auth/telegram">
                    <Button className="w-full" variant={"outline"}>Sign in with Telegram</Button>
                </Link>
            </div>
            <div className="flex w-full items-center gap-2 mb-4"><div className="w-full h-0.5 bg-gray-300"></div><span className="w-full uppercase text-center text-sm text-[#777587]">or email</span><div className="w-full h-0.5 bg-gray-300"></div></div>
            <form className="w-full">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input

                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                    />
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-500"
                        />
                        <span className="ml-2 text-gray-700 text-sm">Remember me for 30 days</span>
                    </label>
                    <a href="/auth/forgot-password" className="text-blue-500 text-sm hover:underline">
                        Forgot password?
                    </a>
                </div>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default LoginPage