import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [avatarUrl, setAvatarUrl] = React.useState(''); // State for avatar URL
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (route) => {
        handleCloseUserMenu();
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        setIsLoggedIn(false);
        setAvatarUrl('');
        handleCloseUserMenu();
    };

    React.useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Check token for user authentication
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/api/user/profile', {
                        headers: { Authorization: `Bearer ${token}` }, // Send token in headers
                    });
                    setIsLoggedIn(true);
                    setAvatarUrl(`http://localhost:5000/${response.data.Avatar}`); // Assume avatar URL comes in response
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsLoggedIn(false);
                    setAvatarUrl('');
                }
            } else {
                setIsLoggedIn(false);
                setAvatarUrl('');
            }
        };

        fetchUserData();
    }, []); // Run on component mount

    // Dynamic settings based on login state
    const settings = isLoggedIn
        ? [
              { name: 'Profile', action: () => handleMenuClick('/profile') },
              { name: 'Log Out', action: handleLogout },
          ]
        : [{ name: 'Log In', action: () => handleMenuClick('/login') }];

    return (
        <div>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                            alt="User Avatar"
                            src={avatarUrl || '/placeholder-avatar.png'} // Default placeholder if no avatar
                        />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={setting.action}>
                            <Typography sx={{ textAlign: 'center', color: 'black' }}>
                                {setting.name}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </div>
    );
}

export default ResponsiveAppBar;
