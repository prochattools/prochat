"use client";
import Image from "next/image";
import { LazyLoadIframe } from "@/components";
import { Telegram, Twitter, Youtube } from "@/icons";
import Link from "next/link";
import AboutBg from "@/assets/images/about-me-bg1.svg";
import AboutBgDark from "@/assets/images/about-me-bg2.svg";
import ProfileImage from "@/assets/images/profile.svg";
import LiveDemoImg from "@/assets/images/live-demo1.svg";
import LiveDemoImgDark from "@/assets/images/live-demo2.svg";

const data = [
  {
    text: "Built and maintained by Steve Westhoek",
    link: "mailto:info@prochat.tools",
    icon: <Youtube />,
  },
  {
    text: "ProChat support",
    link: "mailto:info@prochat.tools",
    icon: <Telegram />,
  },
  {
    text: "Questions? info@prochat.tools",
    link: "mailto:info@prochat.tools",
    icon: <Twitter />,
  },
];

const AboutMe = () => {
  return (
    <div>
      <div className="relative flex justify-center items-center w-full pt-16">
        <Image
          src={AboutBg}
          alt="background"
          fill
          style={{ objectFit: "cover" }}
          className="z-0 block dark:hidden"
        />
        <Image
          src={AboutBgDark}
          alt="background"
          fill
          style={{ objectFit: "cover" }}
          className="z-0 hidden dark:block"
        />
        <div className="relative z-10 max-w-[1440px] w-full px-4 sm:px-12 mb-8">
          <h2 className="text-[32px] sm:text-[42px] leading-[38px] sm:leading-[50px] font-bold text-center text-black1 dark:text-white">
            About ProChat & ProKit
          </h2>
          <div className="flex flex-col lg:flex-row justify-between gap-4 mt-10">
            <div className="min-h-full flex flex-col items-center lg:items-stretch lg:flex-row gap-8 lg:w-[30%] justify-end">
              <div>
                <Image
                  src={ProfileImage}
                  alt="ProChat"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="lg:w-[65%] text-[#41444C] dark:text-[#B2B5BA] text-base font-medium">
              <p className="mb-3">
                ProChat builds and ships SaaS faster by standardizing on one
                stack and one starter: <strong className="text-black1 dark:text-white">ProKit</strong>.
                Everything in this repo is the same engine we use internally.
              </p>
              <ol className="list-decimal marker:font-bold marker:text-black1 dark:marker:text-white ml-4 sm:ml-0">
                <li className="mb-3">
                  <strong className="text-black1 dark:text-white">
                    Ship fast without decisions
                  </strong>{" "}
                  — Next.js, TypeScript, Tailwind/shadcn, Clerk, Prisma/Postgres,
                  Stripe, Resend, and n8n are wired in from day one.
                </li>
                <li className="mb-3">
                  <strong className="text-black1 dark:text-white">
                    Lower ops and copy/paste repeatables
                  </strong>{" "}
                  — billing, auth, dashboards, emails, and analytics come out of
                  the box so we focus on customer value.
                </li>
                <li className="mb-3">
                  <strong className="text-black1 dark:text-white">
                    Learn quickly
                  </strong>{" "}
                  — we ship multiple ideas with the same codebase, keeping
                  everything ProChat-branded and production-ready.
                </li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mt-8 lg:mt-0">
            <div className="lg:-mt-[80px] flex justify-center lg:justify-end order-last lg:order-first">
              <div className="block dark:hidden">
                <Image
                  src={LiveDemoImg}
                  loading="lazy"
                  alt="demo"
                  width={80}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <div className="hidden dark:block">
                <Image
                  src={LiveDemoImgDark}
                  loading="lazy"
                  alt="demo"
                  width={80}
                  height={100}
                  className="mx-auto"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center w-full">
              <p className="text-center text-[#41444C] dark:text-[#B2B5BA]">
                ProKit is the ProChat engine for testing and launching SaaS ideas
                quickly. Built by Steve Westhoek and maintained by the ProChat team.
              </p>
              <div className="flex lg:items-center justify-center mt-3 gap-4 flex-col md:flex-row">
                {data.map((item, index) => (
                  <Link
                    key={index}
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-black1 dark:text-white font-semibold text-base"
                  >
                    <span>{item?.text}</span>
                    <div className="shadow-lg bg-white h-[32px] flex items-center justify-center px-3 rounded-[8px]">
                      {item?.icon}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LazyLoadIframe />
    </div>
  );
};

export default AboutMe;
