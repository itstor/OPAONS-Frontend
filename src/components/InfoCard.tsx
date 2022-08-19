import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import MainCard from '@/components/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.secondary.main} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.secondary.main} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

export default function InfoCard({
  isLoading,
  title,
  value,
  icon,
}: {
  isLoading: boolean;
  value: number;
  title: string;
  icon: JSX.Element;
}) {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems='center' disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant='rounded'
                    sx={{
                      backgroundColor: theme.palette.secondary.light,
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45,
                  }}
                  secondary={<Typography variant='h4'>{value}</Typography>}
                  primary={
                    <Typography
                      variant='subtitle2'
                      sx={{
                        color: theme.palette.grey[500],
                        mt: 0.5,
                      }}
                    >
                      {title}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
}
