import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import ContentCut from '@mui/icons-material/ContentCut';
// import ContentCopy from '@mui/icons-material/ContentCopy';
// import ContentPaste from '@mui/icons-material/ContentPaste';
// import Cloud from '@mui/icons-material/Cloud';
import { Link } from "react-router-dom";

import './left-menu.scss';

import Drawer from '@mui/material/Drawer';

export default function LeftMenu() {
  const drawerWidth = 240;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      className="left-menu"
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">

        </Typography>
      </Toolbar>
      <Divider/>
      <MenuList>
        <MenuItem
          component={Link}
          to={"/my-items"}
          // leftIcon={
          //   <FontIcon className="material-icons">people</FontIcon>
          // }
        >
          <Typography variant="button" display="block" gutterBottom>
            Мои товары
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/buyouts"
        >
          <Typography variant="button" display="block" gutterBottom>
            Выкупы
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/delivery"
        >
          <Typography variant="button" display="block" gutterBottom>
            Доставки
          </Typography>
        </MenuItem>
        {/*<MenuItem>*/}
          {/*<ListItemIcon>*/}
          {/*  <ContentPaste fontSize="small" />*/}
          {/*</ListItemIcon>*/}
          {/*<ListItem>Paste</ListItem>*/}
          {/*<Typography variant="body2" color="text.secondary">*/}
          {/*  ⌘V*/}
          {/*</Typography>*/}
        {/*</MenuItem>*/}
        {/*<MenuItem>*/}
        {/*  <ListItemText>Web Clipboard</ListItemText>*/}
        {/*</MenuItem>*/}
      </MenuList>
    </Drawer>
  );
}
