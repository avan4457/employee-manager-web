"use client";

import * as React from "react";
import EmployeeCard from "./employeeCard";
import { IEmployee } from "@/utils/interfaces/IEmployee";
import { store } from "@/lib/store";
import Toolbar from "./Toolbar";
import { ViewMode } from "@/utils/enums/common.enum";
import { setEmployees } from "@/lib/employee/employeeSlice";
import EmployeeTable from "./employeeTable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";
import { IAlertMessage } from "@/utils/interfaces/IAlertMessage";
import AlertMessage from "@/components/alerts";
import { ICustomError } from "@/utils/interfaces/ICustomError";
import { useRouter } from "next/navigation";

export default function EmployeeView({
  employees,
}: {
  employees: IEmployee[];
}) {
  const router = useRouter();

  const [deleteEmployee, setDeleteEmployee] = React.useState<
    number | undefined | string
  >();

  const [view, setView] = React.useState<ViewMode>(ViewMode.List);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [alert, setAlert] = React.useState<IAlertMessage>();

  React.useEffect(() => {
    if (employees?.length > 0) store.dispatch(setEmployees(employees));
  }, [employees]);

  // Delete employee actions
  const handleDelete = async (id: number | undefined | string) => {
    if (typeof id === "string" && id?.startsWith("temp")) {
      return; // Do not allow deletion of optimistic employees
    }

    let alertObj: IAlertMessage = {
      severity: "success",
      message: "",
      open: true,
      handleClose: () => setAlert({ ...alert, open: false } as IAlertMessage),
    };

    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee/${id}`
      );

      if (res.data.status) {
        alertObj = {
          ...alertObj,
          message: res.data.message,
        };
        setOpenDialog(false);
        setDeleteEmployee(undefined);
        router.refresh();
      } else {
        alertObj = {
          ...alertObj,
          severity: "error",
          message: res.data.message,
        };
      }

      setAlert(alertObj);
    } catch (error) {
      console.error(error);
      alertObj = {
        ...alertObj,
        severity: "error",
        message:
          (error as ICustomError)?.response?.data?.error ||
          (error as Error).message ||
          "",
      };
    }
  };

  const setDelete = (id: number | undefined | string) => {
    setOpenDialog(true);
    setDeleteEmployee(id);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setDeleteEmployee(undefined);
  };

  return (
    <div className="flex flex-col gap-8">
      <Toolbar view={view} setView={setView} />

      <div className="flex flex-wrap justify-center items-start sm:justify-start gap-6">
        {view == ViewMode.Grid ? (
          employees?.map((e: IEmployee, index: number) => (
            <EmployeeCard
              key={index}
              id={e.id}
              firstName={e.firstName}
              lastName={e.lastName}
              number={e.number}
              email={e.email}
              photo={e.photo}
              gender={e.gender}
              setDelete={setDelete}
            />
          ))
        ) : (
          <EmployeeTable employees={employees} setDelete={setDelete} />
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete employee{" "}
            {employees?.find((e) => e?.id === deleteEmployee)?.firstName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDelete(deleteEmployee)}
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {alert && (
        <AlertMessage
          severity={alert?.severity}
          open={alert?.open}
          handleClose={alert?.handleClose}
          message={alert?.message}
        />
      )}
    </div>
  );
}
