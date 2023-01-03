import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';
import { useSelector } from 'react-redux';
import { getAllowedRoutes } from 'utils/AuthRoles';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { role } = useSelector((state) => state.user);
    const mainRoutes = { ...MainRoutes, children: getAllowedRoutes(MainRoutes.children, [role]) };
    return useRoutes([mainRoutes, AuthenticationRoutes], config.basename);
}
