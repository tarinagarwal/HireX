import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  Briefcase,
  BriefcaseBusiness,
  Heart,
  LogIn,
  PenBox,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Sparkles, Zap, Rocket } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  const [bounce, setBounce] = useState(false);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setBounce((prev) => !prev);
    }, 2000);
    return () => clearInterval(bounceInterval);
  }, []);
  return (
    <>
      <nav className="py-4 px-4 ml-5 mt-4 flex justify-between items-center">
        <Link to="/">
          <div className="relative">
            <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl lg:text-5xl">
              <span
                className="relative inline-block transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setSpin(true)}
                onMouseLeave={() => setSpin(false)}
              >
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  Hire
                </span>
                <Zap
                  className={`absolute -top-6 -left-6 h-8 w-8 text-yellow-400 transition-transform duration-500 ${
                    spin ? "rotate-180" : ""
                  }`}
                />
              </span>
              <span
                className={`relative inline-block text-primary transition-all duration-300 hover:rotate-12 ${
                  bounce ? "animate-bounce" : ""
                }`}
              >
                X
                <Sparkles className="absolute -top-4 -right-4 h-6 w-6 animate-pulse text-yellow-400" />
              </span>
            </h1>
            <Rocket className="absolute -bottom-6 right-0 h-10 w-10 animate-bounce text-blue-500" />
          </div>
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant="outline"
              className="bg-transparent border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
              onClick={() => setShowSignIn(true)}
            >
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button
                  variant="outline"
                  className="bg-transparent border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                >
                  <Briefcase className="mr-2 h-4 w-4" /> Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label={
                    user?.unsafeMetadata?.role === "candidate"
                      ? "My Applications"
                      : "My Jobs"
                  }
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/on-boarding"
            fallbackRedirectUrl="/on-boarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
