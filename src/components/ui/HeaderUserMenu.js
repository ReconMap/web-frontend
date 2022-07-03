import { Badge, Divider, HStack, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Link as ChakraLink } from '@chakra-ui/react';
import UserAvatar from "components/badges/UserAvatar";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import KeyCloakService from "services/keycloak";

const HeaderUserMenu = () => {
    const { user, logout } = useContext(AuthContext);

    return <Menu closeOnBlur closeOnSelect>
        <MenuButton>
            <UserAvatar email={user.email} name={user.name} />
        </MenuButton>
        <MenuList>
            <HStack
                px="3"
                pb="3"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text color="gray.500">{KeyCloakService.GetUsername()}</Text>
                <Badge colorScheme="red">{user.role}</Badge>
            </HStack>
            <ChakraLink href={KeyCloakService.GetProfileUrl()} isExternal>
                <MenuItem>Your kc profile</MenuItem>
            </ChakraLink>
            <Link to={`/users/${user.id}`}>
                <MenuItem>Your profile</MenuItem>
            </Link>
            <Link to="/users/preferences">
                <MenuItem>Preferences</MenuItem>
            </Link>
            <Link to="/users/password-change">
                <MenuItem>Change password</MenuItem>
            </Link>
            <Divider />
            <Link to="/" onClick={logout}>
                <MenuItem>Logout</MenuItem>
            </Link>
        </MenuList>
    </Menu>
}

export default HeaderUserMenu;
