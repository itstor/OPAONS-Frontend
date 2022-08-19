import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';
import { CSSProperties, forwardRef } from 'react';

const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

type MainCardProps = {
  border?: boolean;
  boxShadow?: boolean;
  children?: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: CSSProperties;
  darkTitle?: boolean;
  secondary?: React.ReactNode;
  shadow?: string;
  sx?: CSSProperties;
  title?: React.ReactNode;
};

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: (theme.palette.primary as ColorPartial)[200] ?? 0 + 75,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
          },
          ...sx,
        }}
      >
        {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant='h3'>{title}</Typography>} action={secondary} />}

        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
