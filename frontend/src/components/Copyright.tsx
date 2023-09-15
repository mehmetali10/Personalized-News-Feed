import { Typography, Link, TypographyProps } from "@mui/material";

interface CopyrightProps extends TypographyProps {
  children?: React.ReactNode;
  variant?: "inherit" | "body2" | "body1" | "subtitle1" | "subtitle2" | "button" | "caption" | "overline" | undefined;
  color?: "initial" | "inherit" | "primary" | "secondary" | "textPrimary" | "textSecondary" | "error" | undefined;
  align?: "inherit" | "left" | "center" | "right" | "justify" | undefined;
}

export default function Copyright(props: CopyrightProps) {
  return (
    <Typography {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        NewsApp 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
