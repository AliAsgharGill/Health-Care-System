import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <>
      <div className="flex justify-between items-center m-5">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={200}
            height={200}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/images/admin.png"
            alt="admin"
            height={32}
            width={32}
          />
          <p className="text-white ml-2 font-semibold">Admin</p>
        </div>
      </div>
    </>
  );
};

export default Nav;
