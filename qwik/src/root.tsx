import { component$ } from "@builder.io/qwik";
import {
  Link,
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <title>LISTS!</title>
        <meta name="description" content="just lists" />
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en" class="bg-neutral-950 font-sans text-white">
        <div class="flex h-screen flex-col">
          <nav class="flex items-center border-b border-b-indigo-800 bg-indigo-950 px-1 py-2 shadow">
            <div class="basis-1/3">
              <button class="rounded-sm px-2 py-2 hover:bg-indigo-800">
                MENU
              </button>
            </div>
            <div class="flex basis-1/3 justify-center">
              <Link class="mx-2 text-2xl font-bold tracking-tight" href="/">
                LISTS!
              </Link>
            </div>
          </nav>
          <RouterOutlet />
        </div>
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
