import qs from "query-string";

export const getPathParams = (
  path: string
): {
  isTeacher: boolean;
  isPlayer: boolean;
  isStudent: boolean;
  isSearch: boolean;
} => {
  if (path?.startsWith("/teacher")) {
    return {
      isTeacher: true,
      isPlayer: false,
      isStudent: false,
      isSearch: false,
    };
  } else if (path?.includes("/courses")) {
    return {
      isTeacher: false,
      isPlayer: true,
      isStudent: false,
      isSearch: false,
    };
  } else if (path?.includes("/search")) {
    return {
      isTeacher: false,
      isPlayer: false,
      isStudent: false,
      isSearch: true,
    };
  } else {
    return {
      isTeacher: false,
      isPlayer: false,
      isStudent: true,
      isSearch: false,
    };
  }
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const getSearchedUrl = (
  path: string,
  category: string | null,
  title: string | null
): string => {
  const url: string = qs.stringifyUrl(
    {
      url: path,
      query: {
        categoryId: category,
        title: title,
      },
    },
    { skipEmptyString: true, skipNull: true }
  );
  return url;
};
