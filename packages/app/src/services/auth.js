import UserPermissions from "components/users/Permissions";
import KeyCloakService from "./keycloak";

const Auth = {
    removeSession: () => {
        localStorage.clear();
    },

    getLoggedInUser: () => {
        const kcInstance = KeyCloakService.getInstance();
        if (kcInstance.authenticated) {
            const role = kcInstance.resourceAccess['web-client']?.roles[0];
            const user = {
                id: 1,
                full_name: kcInstance.tokenParsed.name,
                access_token: kcInstance.token,
                email: kcInstance.tokenParsed.email,
                role: role,
                permissions: UserPermissions[role],
            };
            return user;
        }
        return null;
    }
}

export default Auth;
