import { Typography, Link, TypographyProps } from "@mui/material";
import React from "react";

const copyrightStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f8f8f8", 
  color: "#555", 
  textAlign: "center",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
};

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#0078D4", // Accent color
  fontWeight: "bold",
};

interface CopyrightProps extends TypographyProps {
  children?: React.ReactNode;
  variant?: "inherit" | "body2" | "body1" | "subtitle1" | "subtitle2" | "button" | "caption" | "overline" | undefined;
  color?: "initial" | "inherit" | "primary" | "secondary" | "textPrimary" | "textSecondary" | "error" | undefined;
  align?: "inherit" | "left" | "center" | "right" | "justify" | undefined;
}

export default function Copyright(props: CopyrightProps) {
  return (
    <Typography style={copyrightStyle} {...props}>
      {'Copyright © '}
      <Link style={linkStyle} href="#">
        NewsApp - <small>Mehmet Ali Mergen</small> 
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
