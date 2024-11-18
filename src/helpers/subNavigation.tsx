import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
export const updateQueryString = (
  pathName: String,
  router: AppRouterInstance,
  query: Array<{ name: string; value: string; type: string }>
  // name: string,
  // value: string
) => {
  let searchParams = new URLSearchParams(window.location.search);
  query.map(({ name, value, type }) => {
    if (type === "add") {
      if (value) {
        if (!Array.isArray(value)) {
          if (!searchParams.has(name)) searchParams.append(name, value);
          else searchParams.set(name, value);
        } else {
          if (!searchParams.has(name)) searchParams.append(name, value.join());
          else searchParams.set(name, value.join());
        }
      } else if (searchParams.has(name)) searchParams.delete(name);
    } else {
      if (value) {
        if (!Array.isArray(value)) {
          if (searchParams.has(name)) searchParams.delete(name, value);
        }
      } else if (searchParams.has(name)) searchParams.delete(name);
    }
  });
  let newUrl;
  if (searchParams === undefined) newUrl = "";
  else newUrl = "?" + searchParams.toString();

  router.push(`${pathName}/${newUrl}`);
};
