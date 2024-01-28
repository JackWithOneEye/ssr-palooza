import { ReadonlyURLSearchParams } from "next/navigation";

export function concatSearchParams(
  searchParams: ReadonlyURLSearchParams
): `?${string}` | "" {
  const qp = [];
  for (const [key, value] of searchParams.entries()) {
    qp.push(`${key}=${value}`);
  }
  if (qp.length > 0) {
    return `?${qp.join("&")}`;
  }
  return "";
}