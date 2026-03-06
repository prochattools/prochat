"use client";
import Image from "next/image";
import { Logo } from "@/components";
import Link from "next/link";
import NavLinks from "@/components/nav-links";
import { Youtube } from "@/icons";
import footerBg from "@/assets/images/footer-bg1.svg";
import footerBgDark from "@/assets/images/footer-bg2.svg";

const nav_links1 = [
  {
    title: "Demo",
    link: "/",
  },
  {
    title: "Pricing",
    link: "/",
  },
  {
    title: "Proof",
    link: "/proof",
  },
  {
    title: "Support",
    link: "https://discord.com/channels/1433752576779878583/1433754043498500147",
  },
  {
    title: "Documentation",
    link: "https://docs.prochat.tools",
  },
  {
    title: "Affiliates",
    link: "#",
  },
];

const nav_links2 = [
  {
    title: "Terms of services",
    link: "https://prochat.tools/terms/",
  },
  {
    title: "Privacy Policy",
    link: "https://prochat.tools/privacy/",
  },
  {
    title: "Licences",
    link: "#",
  },
];

const data = [
  {
    link: "https://www.youtube.com/@stevewesthoek",
    icon: <Youtube />,
  },
];

const Footer = () => {
  return (
    <div className="relative flex justify-center items-center w-full">
      <Image
        src={footerBg}
        alt="background"
        fill
        style={{ objectFit: "cover" }}
        className="z-0 block dark:hidden"
      />
      <Image
        src={footerBgDark}
        alt="background"
        fill
        style={{ objectFit: "cover" }}
        className="z-0 hidden dark:block"
      />
      <div className="relative z-10 max-w-[1440px] w-full h-full px-4 sm:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 h-full gap-x-4 gap-y-12">
          <div className="flex flex-col !min-h-[inherit] justify-between gap-8">
            <Link href="/">
              <Logo scale={1.3} />
            </Link>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Launch your SaaS in days, not weeks
              </p>
            </div>
          </div>
          <div className="sm:order-3 xl:order-2">
            <p className="uppercase text-tertiary font-semibold text-base mb-8">
              Links
            </p>
            <NavLinks nav_links={nav_links1} isFooter={true} />
          </div>
          <div className="sm:order-last xl:order-3">
            <p className="uppercase text-tertiary font-semibold text-base mb-8">
              Legal
            </p>
            <NavLinks nav_links={nav_links2} isFooter={true} />
          </div>
          <div className="sm:order-2 xl:order-last">
            <p className="uppercase text-tertiary font-semibold text-base mb-8">
              CONTACT THE MAKER
            </p>
            <p className="text-black1 dark:text-white font-medium text-base mb-6">
              Steve Westhoek
            </p>
            <p className="text-black1 dark:text-white font-medium text-base mb-6">
              ProChat
            </p>
            <div className="flex items-center gap-4">
              {data.map((item, index) => (
                <Link
                  key={index}
                  href={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="shadow-lg bg-white h-[32px] flex items-center justify-center px-3 rounded-[8px]">
                    {item?.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center justify-center sm:w-auto sm:justify-start">
            <div className="w-full max-w-[250px]">
              <div className="relative h-[30px] w-full">
                <a
                  href="https://status.prochat.tools/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Open ProChat service status"
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">Open ProChat service status</span>
                </a>
                <div className="block dark:hidden">
                  <iframe
                    src="https://status.prochat.tools/badge?theme=light"
                    title="ProChat service status badge"
                    aria-label="ProChat service status badge"
                    loading="lazy"
                    width="250"
                    height="30"
                    frameBorder="0"
                    scrolling="no"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin"
                    className="block h-[30px] w-full border-0 pointer-events-none"
                    style={{ colorScheme: "normal" }}
                  />
                </div>
                <div className="hidden dark:block">
                  <iframe
                    src="https://status.prochat.tools/badge?theme=dark"
                    title="ProChat service status badge"
                    aria-label="ProChat service status badge"
                    loading="lazy"
                    width="250"
                    height="30"
                    frameBorder="0"
                    scrolling="no"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin"
                    className="block h-[30px] w-full border-0 pointer-events-none"
                    style={{ colorScheme: "normal" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-medium text-center sm:text-right">
            © 2025 ProChat - All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
