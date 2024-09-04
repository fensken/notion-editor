"use client";

import { FC } from "react";
import { useUser } from "@clerk/nextjs";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Breadcrumbs from "./Breadcrumbs";

type HeaderProps = {};

const Header: FC<HeaderProps> = ({}) => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}

      {/* Breadcrumbs  */}
      <Breadcrumbs />

      <div className="">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
