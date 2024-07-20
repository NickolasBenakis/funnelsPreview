import Image from "next/image";
import Link from "next/link";

export const Navbar = async () => {
  return (
    <nav className="w-full border-b">
      <div className="px-4 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-lg font-bold flex gap-4 align-middle"
        >
          <Image
            src="/logo/logo.png"
            alt="logo"
            width={32}
            height={32}
            loading="lazy"
          />
          <h6 className="self-center">Funnels Preview</h6>
        </Link>
      </div>
    </nav>
  );
};
