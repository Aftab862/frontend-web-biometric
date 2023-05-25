// assets
import { Add } from '@mui/icons-material';
import { IconDashboard } from '@tabler/icons';
import PersonIcon from '@mui/icons-material/Person';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import ArticleIcon from '@mui/icons-material/Article';
import DeselectIcon from '@mui/icons-material/Deselect';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { roles } from 'config/roles';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            permission: [roles.admin],
            icon: icons.IconDashboard,
            breadcrumbs: false
        },

        {
            id: 'addemployee-page',
            title: 'Add employee',
            type: 'item',
            url: '/addemployee',
            permission: [roles.admin],
            icon: Add,
            breadcrumbs: false
        },

        {
            id: 'viewemployees-page',
            title: 'Employees',
            type: 'item',
            url: '/viewemployees',
            permission: [roles.admin],
            icon: PersonIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'AddAllowance-page',
        //     title: 'New Allowance',
        //     type: 'item',
        //     url: '/add-allowance',
        //     permission: [roles.admin],
        //     icon: Add,
        //     breadcrumbs: false
        // },
        {
            id: 'salaryslip-page',
            title: 'Salary Slip',
            type: 'item',
            url: '/salary-slip',
            permission: [roles.employee],
            icon: ArticleIcon,
            breadcrumbs: false
        },
        {
            id: 'searchrecords-page',
            title: 'View records',
            type: 'item',
            url: '/search-records',
            permission: [roles.employee],
            icon: ScreenSearchDesktopIcon,
            breadcrumbs: false
        },

        // {
        //     id: 'verifypensioner-page',
        //     title: 'Video Meet',
        //     type: 'item',
        //     url: '/verify',
        //     permission: [roles.employee],
        //     icon: TagFacesIcon,
        //     breadcrumbs: false
        // },
        {
            id: 'gpfund-page',
            title: 'Salaries Record',
            type: 'item',
            url: '/records',
            permission: [roles.admin],
            icon: ArticleIcon,
            breadcrumbs: false
        },
        {
            id: 'videoMeeting-page',
            title: 'Video Meet',
            type: 'item',
            url: '/verifypensionar',
            permission: [roles.admin],
            icon: TagFacesIcon,
            breadcrumbs: false
        },

        {
            id: 'ScaleWise Increments',
            title: 'Increments',
            type: 'item',
            url: '/increments',
            permission: [roles.admin],
            icon: Add,
            breadcrumbs: false

        }

    ]
};

export default dashboard;
