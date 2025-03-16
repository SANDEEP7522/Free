import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

export const Header = async() => {
   await checkUser();
  return (
    <div className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-md">
      <nav className="flex items-center justify-between px-6 py-3 max-w-6xl mx-auto">
        {/* Logo for the app */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-bold text-blue-600 transition hover:text-blue-800 cursor-pointer"
        >
          <span className="text-3xl">💰</span>
          <span>Finance</span>
        </Link>

        {/* Auth Buttons for the app  */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard"
            className="flex items-center space-x-2 text-2xl font-bold text-blue-600 transition hover:text-blue-800 cursor-pointer"
            >
              <Button variant="outline">
                <LayoutDashboard size={20} />
                <span className="hidden md:inline" >
                 Dashboard</span>
              </Button>
            </Link>

            <Link href="/transactions/create"
            className="flex items-center space-x-2 text-2xl font-bold text-blue-600 transition hover:text-blue-800 cursor-pointer"
            >
              <Button variant="outline">
                <PenBox size={20} />
                <span className="hidden md:inline" >
                 Dashboard</span>
              </Button>
            </Link>
          </SignedIn>




          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
