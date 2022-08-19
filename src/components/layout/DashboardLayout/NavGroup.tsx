import { Divider, List, Typography, useTheme } from '@mui/material';

import { MenuItem } from '@/data/menu-items';

import NavCollapse from '@/components/layout/DashboardLayout/NavCollapse';
import NavItem from '@/components/layout/DashboardLayout/NavItem';

export default function NavGroup({ item, ...others }: { item: MenuItem }) {
  const theme = useTheme();

  const items = item.children?.map((menu: MenuItem) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} {...others} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} {...others} />;
      default:
        return (
          <Typography key={menu.id} variant='h6' color='error' align='center'>
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant='caption' sx={{ ...theme.typography.menuCaption }} display='block' gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      <Divider sx={{ mt: 0.25, mb: 1.25 }} className='border-secondary-600/50' />
    </>
  );
}
