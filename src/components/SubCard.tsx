import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CSSProperties, forwardRef } from 'react';

type SubCardProps = {
  children?: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: React.ReactNode;
  sx?: CSSProperties;
  contentSX?: CSSProperties;
  title?: JSX.Element | string;
};

const SubCard = forwardRef(
  (
    { children, content = true, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }: SubCardProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          border: '1px solid',
          borderColor: theme.palette.primary.light,
          ':hover': {
            boxShadow: '0 2px 14px 0 rgb(143 93 34 / 8%)',
          },
          ...sx,
        }}
        {...others}
      >
        {!darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant='h5'>{title}</Typography>} action={secondary} />}
        {darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant='h4'>{title}</Typography>} action={secondary} />}

        {content && (
          <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default SubCard;
