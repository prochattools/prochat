"use client";

import React, { FC } from "react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import { NotInclude, Tick } from "@/icons";

interface PriceItemProps {
  item: StripeProduct;
  isLink?: boolean;
  disabled?: boolean;
}

const PriceItem: FC<PriceItemProps> = ({
  item,
  isLink = false,
  disabled = false,
}) => {
  const isSubscription = item.type === "subscription";

  return (
    <div
      className={`relative min-w-[300px] lg:min-w-[330px] w-fit pb-6 pt-10 bg-surface-elevated scale-1 hover:scale-[1.05] transition-all duration-300 px-4 border rounded-[16px] shadow-surface ${
        item?.isBest ? "border-emerald-500/45" : "border-border-subtle"
      }`}
    >
      <div>
        <div>
          <p className="text-foreground font-medium text-lg">
            {item?.title}
          </p>

          <div className="flex items-center justify-start gap-2 my-3">
            <p
              className={`text-[42px] font-bold ${
                item?.isBest ? "text-emerald-600" : "text-foreground"
              }`}
            >
              €{item?.price}{" "}
              <span className="text-base font-semibold text-tertiary">
                / {isSubscription ? (item as StripePlan).period : "one-time"}
              </span>
            </p>
          </div>
          {item.subtitle && (
            <p className="text-green-600 font-semibold mb-6">{item.subtitle}</p>
          )}
          {item?.features?.map((cardItem: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <div className="text-rose-300 dark:text-rose-700">
                {cardItem?.disabled ? (
                  <NotInclude />
                ) : (
                  <Tick
                    width={item?.isBest ? 19 : 16}
                    height={item?.isBest ? 19 : 16}
                  />
                )}
              </div>
              <div className="flex justify-between items-center gap-3">
                <p
                  className={`font-medium ${
                    cardItem?.disabled
                      ? "text-muted-foreground dark:text-tertiary"
                      : "text-foreground"
                  } ${item?.isBest ? "text-lg" : "text-base"}`}
                >
                  {cardItem?.title}
                </p>
                <p
                  className={`${
                    item?.isBest && item?.features?.length - 1 === index
                      ? "bg-emerald-600 rounded-full flex items-center h-fit py-[6px] px-3 font-bold text-sm whitespace-nowrap text-white"
                      : "hidden"
                  }`}
                >
                  Update 4 days ago
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 mb-3 block">
          {isLink ? (
            <Link
              href={`/processing-page?priceId=${item.priceId}`}
              className="text-white font-semibold whitespace-nowrap text-sm px-6 py-4 rounded-lg w-full scale-1 hover:scale-[1.05] transition-all duration-300 bg-primary"
            >
              {item.linkTitle}
            </Link>
          ) : (
            <CheckoutButton disabled={disabled} priceId={item.priceId} />
          )}
        </div>
        <p
          className={`text-center text-muted-foreground ${
            item?.isBest ? "text-lg" : "text-base"
          }`}
        >
          Pay once. Forever access.
          <br />
          Ship unlimited projects!
        </p>
      </div>
      {item?.isBest && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-lg font-bold rounded-[8px] px-6 py-3 uppercase">
          Best deal
        </div>
      )}
    </div>
  );
};

export default PriceItem;
