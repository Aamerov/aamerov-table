import { userSchema } from "@/Validations/InputValidation";
import { tableActions } from "@/store/slices/slice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

// import { useMutation } from "urql";
// import gql from "graphql-tag";

// const POST_MUTATION = gql`
//   mutation ($input: CreatePostInput!) {
//     createPost(input: $input) {
//       id
//       title
//     }
//   }
// `;

export default function AddItemForm(props) {
  const dispatch = useDispatch();
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  // const [state, executeMutation] = useMutation(POST_MUTATION);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    let formData = {
      id: data.get("id"),
      title: data.get("title"),
    };
    try {
      await userSchema.validate(formData);
      props.handleCloseFunction();
      dispatch(tableActions.addRow({ id, title }));
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.toString());
    }
  };

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleCloseFunction}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "red" }}>
            {errorMessage}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="id"
              name="id"
              label="ID"
              type="number"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              name="title"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <DialogActions>
              <Button onClick={props.handleCloseFunction}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
