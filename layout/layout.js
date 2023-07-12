import { NavBar } from "@/components/NavBar"

export default function Layout({ children, topNav, URL_BACK_END }) {
    return (
        <div>

            {topNav}

            <main className="bg-stone-700 min-h-screen w-full py-[80px]">
                <div className="max-w-[800px] m-auto">
                    {children}
                </div>
            </main>

            <NavBar
                URL_BACK_END={URL_BACK_END}
            />

        </div>
    )
}