// assets
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import { MenuItem } from '@/data/menu-items';

import NavItem from '@/components/layout/DashboardLayout/NavItem';

export default function NavCollapse({ menu, level, ...others }: { menu: MenuItem; level: number }) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  const menus = menu.children?.map((item: MenuItem) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} {...others} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} {...others} />;
      default:
        return (
          <Typography key={item.id} variant='h6' color='error' align='center'>
            Menu Items Error
          </Typography>
        );
    }
  });

  const menuIcon = menu.icon ? (
    <FontAwesomeIcon icon={menu.icon} fontSize='1rem' color='#774514' />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `12px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={selected === menu.id ? 'h5' : 'body1'} color='#774514' sx={{ my: 'auto' }}>
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <FontAwesomeIcon
            icon={faChevronUp}
            color='#774514'
            fontSize='0.7rem'
            stroke='1.5px'
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            color='#774514'
            fontSize='0.7rem'
            stroke='1.5px'
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List
          component='div'
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              border: '1px solid #F8E5C5',
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
}
