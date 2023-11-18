import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";

export default function AddButton(props) {
  return (
    <Paper sx={{ p: 1, m: 1, boxShadow: 3 }}>
      <Button variant="contained" fullWidth onClick={props.handleOpenFunction}>
        Add Item
      </Button>
    </Paper>
  );
}
