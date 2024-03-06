import React, { useState } from 'react';
import { Collapse, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CollapsibleItem = ({ icon, primary, children }) => {
    const [open, setOpen] = useState(false);

    const handleCollapse = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem button onClick={handleCollapse} className="nav text-white">
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={primary} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </>
    );
};

export default CollapsibleItem;