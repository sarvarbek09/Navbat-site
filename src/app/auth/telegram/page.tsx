import { Button } from "@/components/ui/button"
import Link from "next/link"

const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen">
            <Link className="block w-fit" href='/'><button className="block text-xs cursor-pointer active:bg-gray-100 rounded-md py-2 px-3 active:translate-y-[1px] active:-translate-z-0.5 transition-transform duration-100">{'<- '}Bosh sahifaga</button></Link>
            <div className="flex flex-col mb-3 px-3">
                <h3 className="text-lg text-[#3525CD] font-semibold mt-3">SalonFlow</h3>
                <h2 className="text-4xl font-bold mb-4">Telegram orqali kirish</h2>
                <p className="text-lg font-light mb-4">Enter your details to access your wellness dashboard.</p>
            </div>
            <div className="flex gap-3 *:**:flex-col px-3">
                <Link href="https://t.me/SalonFlowBot">
                    <Button className="w-full" variant={"outline"}>Klientlar uchun -{'>'}</Button>
                </Link>
                <Link href="https://t.me/SalonFlowBot">
                    <Button className="w-full" variant={"outline"}>Biznes egasi uchun -{'>'} </Button>
                </Link>
            </div>
        </div>
    )
}

export default LoginPage