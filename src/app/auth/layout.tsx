
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50">
            <div className="w-full flex">
                <div className="w-full flex py-50 justify-center bg-[#4F46E5] max-w-[50%]">
                    <div className="text-center max-w-[57%] text-[#DAD7FF] flex flex-col gap-3">
                        <h2 className="text-5xl font-semibold">Elevate your wellness experience.</h2>
                        <p className="text-lg font-light">Manage appointments, connect with premium
                            specialists, and find your flow in the world of
                            beauty and relaxation.</p>
                    </div>
                </div>
                <div className="w-full flex justify-center">{children}</div>
            </div>
        </div>
    );
}

export default AuthLayout;