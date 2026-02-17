"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BlogRedirect({ slug }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/?post=${slug}`);
  }, [router, slug]);

  return null;
}
