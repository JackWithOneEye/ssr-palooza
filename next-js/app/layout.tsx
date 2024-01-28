import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LISTS!",
  description: "just lists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [open, setOpen] = useState(false);
  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-950 dark:text-white font-sans">
        <div className="h-screen flex flex-col">
          <nav className="flex items-center px-1 py-2 dark:bg-gray-900">
            <div className="basis-1/3">
              <button className=" ounded-sm px-2 py-2 hover:bg-gray-800">
                MENU
              </button>
            </div>
            <div className="flex basis-1/3 justify-center">
              <Link className="text-2xl font-bold tracking-tight mx-2" href="/">
                LISTS!
              </Link>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
