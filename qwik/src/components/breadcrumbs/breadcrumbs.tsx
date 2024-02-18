import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

interface Breadcrumb {
  label: string;
  url: string;
}

export interface BreadcrumbsProps {}

export const Breadcrumbs = component$<BreadcrumbsProps>(() => {
  const location = useLocation();
  const breadcrumbs = location.url.pathname
    .split("/")
    .filter(Boolean)
    .reduce<Breadcrumb[]>((acc, segment, index, array) => {
      const url = `/${array.slice(0, index + 1).join("/")}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      acc.push({ label, url });
      return acc;
    }, []);
  const last = breadcrumbs.length - 1;
  return (
    <div class="flex flex-none gap-4 overflow-auto p-4">
      <Breadcrumb label={"HOME"} path="/" end={breadcrumbs.length === 0} />
      {breadcrumbs.map(({ label, url }, i) => (
        <Breadcrumb key={url} label={label} path={url} end={i === last} />
      ))}
    </div>
  );
});

const Breadcrumb = component$<{
  label: string;
  path: string;
  end?: boolean;
}>(({ label, path, end }) => {
  if (end) {
    return <span class="font-bold">{label}</span>;
  }
  return (
    <>
      <Link href={path}>{label}</Link>
      <span>{">"}</span>
    </>
  );
});
