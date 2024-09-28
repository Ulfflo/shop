// components/Analytics.js
"use client"; // Make this a client component

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as gtag from "../lib/gtag"; // Import gtag functions

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams ? "?" + searchParams.toString() : "");
    gtag.pageview(url); // Send the current path to Google Analytics
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
};

export default Analytics;
