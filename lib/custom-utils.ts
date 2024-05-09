export const getPathParams = (path: string): {
    isTeacher: boolean;
    isPlayer: boolean;
    isStudent: boolean;
} => {
    if (path?.startsWith('/teacher')) {
         return { isTeacher: true, isPlayer: false, isStudent: false };
    } else if (path?.includes('/chapter')) {
        return { isTeacher: false, isPlayer: true, isStudent: false };
    } else {
        return { isTeacher: false, isPlayer: false, isStudent: true };
    }
}