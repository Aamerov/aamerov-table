import { Box, Paper } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";
import AddButton from "../../components/AddItemButton/AddButton";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import DataTable from "../../components/Table/DataTable";
import { showDataQuery } from "../graphQL/queries/showDataQuery";
import { tableActions } from "../store/slices/slice";

export default function Home() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [result, reexecuteQuery] = useQuery({
    query: showDataQuery,
    // variables: {
    //   options: {
    //     paginate: {
    //       page: 1,
    //       limit: 50,
    //     },
    //   },
    // },
  });
  const refresh = () => {
    // Refetch the query and skip the cache
    reexecuteQuery({ requestPolicy: "network-only" });
  };
  const { data, fetching, error } = result;

  const rows = data?.posts?.data;

  useEffect(() => {
    if (!rows) {
      return;
    }
    dispatch(tableActions.setData(rows));
    return () => {};
  }, [dispatch, rows]);

  const rowsList = useSelector((state) => state.table.data);

  if (fetching) return <h1>Loading</h1>;

  if (error) return <h1>An Error Occured</h1>;

  return (
    <Box>
      <Paper sx={{ width: "100%", padding: 1, boxShadow: 3 }}>
        <AddItemForm
          handleCloseFunction={handleClose}
          open={open}
          refresh={refresh}
        />
        <AddButton handleOpenFunction={handleClickOpen} />
        <DataTable rows={rowsList} />
      </Paper>
    </Box>
  );
}
