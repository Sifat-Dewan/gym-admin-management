import { ReactNode } from "react";

export default function AuthLayout({children} : {children: ReactNode}) {
    return (
        <div className="min-h-screen py-20 flex items-center justify-center">
            {children}
        </div>
    )
}