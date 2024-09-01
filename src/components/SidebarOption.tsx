"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

import { db } from "@/firebase";

type SidebarOptionProps = {
  href: string;
  id: string;
};

const SidebarOption: FC<SidebarOptionProps> = ({ href, id }) => {
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`border p-2 rounded-md ${
        isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
      }`}
    >
      <p className="truncate">{data.title}</p>
    </Link>
  );
};

export default SidebarOption;
