import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import { MenuItem } from '@/data/menu-items';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavItem = ({ item, level, ...others }: { item: MenuItem; level: number; [x: string]: any }) => {
  const theme = useTheme();
  const router = useRouter();
  const url = location.pathname + location.search;

  const isOpened = item.url === url || others.childOf === item.id;

  const itemIcon = item?.icon ? (
    <FontAwesomeIcon icon={item.icon} fontSize='1.1rem' color='#774514' />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: isOpened ? 8 : 6,
        height: isOpened ? 8 : 6,
      }}
      htmlColor='#774514'
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <ListItemButton
      sx={{
        borderRadius: `12px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={isOpened}
      onClick={() => router.push(`${item.url}`)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={isOpened ? 'h5' : 'body1'} color='#774514'>
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
