import Link from "next/link";
import Image from "next/image";
/* import { Button } from "../ui/button"; */
import { useTranslations } from "next-intl";
export default function Header() {
  const t = useTranslations("header");
  return (
    <header className="sticky top-0 backdrop-blur-sm z-50 w-full px-8 lg:px-4">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-4">
        <Link
          href={process.env.NEXT_PUBLIC_SITE_URL || "/"}
          className="flex items-center gap-2"
        >
          <Image
            src="/static/speetly-logo.png"
            alt="Speetly Logo"
            width={100}
            height={50}
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold">Speetly</h1>
        </Link>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href={`/`}>{t("blog")}</Link>
            </li>
            <li className="relative">
              <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/changelog`}>
                {t("whatsNew")}
              </Link>
              <div className="w-1 h-1 bg-red-500 rounded-full absolute top-0 -right-2 animate-pulse"></div>
            </li>

            {/* Sign In and Sign Up Buttons */}

            {/* <li> 
              <Link href="/">
                <Button variant="outline">{t("signIn")}</Button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Button>{t("signUp")}</Button>
              </Link>
            </li> 
            */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
