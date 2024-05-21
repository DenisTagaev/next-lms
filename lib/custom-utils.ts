export const getPathParams = (path: string): {
    isTeacher: boolean;
    isPlayer: boolean;
    isStudent: boolean;
    isSearch: boolean;
} => {
    if (path?.startsWith('/teacher')) {
        return { isTeacher: true, isPlayer: false, isStudent: false, isSearch: false };
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
      return { isTeacher: false, isPlayer: false, isStudent: true, isSearch: false };
    }
}