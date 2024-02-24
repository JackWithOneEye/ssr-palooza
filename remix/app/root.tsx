import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <title>LISTS!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark">
        <div className="h-screen flex flex-col">
          <nav className="flex items-center px-1 py-2 border-b-2">
            <div className="basis-1/3">
              <button className="rounded-sm px-2 py-2">MENU</button>
            </div>
            <div className="flex basis-1/3 justify-center">
              <Link className="text-2xl font-bold tracking-tight mx-2" to="/">
                LISTS!
              </Link>
            </div>
          </nav>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
