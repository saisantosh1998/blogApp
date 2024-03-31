import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({ children, styles, ...rest }) => {
  return (
    <Button
      sx={{
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        ...styles,
        '&:hover': {
            backgroundColor: 'rgba(0, 1, 0, 0.08)',
            color: "var(--green)",
          },
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
