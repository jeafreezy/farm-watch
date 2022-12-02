//Auth Context Types
export type TAuthContext = {
    login: () => void;
    isAuthenticated: boolean;
    displayName: string | null;
    displayPicture: string | null;
    token: string | null;
    authState: string | null;
    loading: boolean;
    logOut: () => void;
};
