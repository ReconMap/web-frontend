import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";

const RestrictedComponent = ({ roles, children, message = '' }) => {
    const { user } = useContext(AuthContext);

    return (!user || !roles.includes(user.role) ? message : children);
}

export default RestrictedComponent;
