"use client";

import { useEffect, useState } from "react";

export default function Defer({
  children,
  delay = 500,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => setShow(true), delay);

    return () => clearTimeout(handle);
  }, [delay]);
  return <>{show ? children : null}</>;
}
