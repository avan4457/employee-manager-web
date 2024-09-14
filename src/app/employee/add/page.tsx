"use client";

import React from "react";
import { IEmployee } from "@/utils/interfaces/IEmployee";
import EmployeeForm from "../(components)/employeeForm";
import axios from "axios";
import { IAlertMessage } from "@/utils/interfaces/IAlertMessage";
import { useRouter } from "next/navigation";
import { ICustomError } from "@/utils/interfaces/ICustomError";
import AlertMessage from "@/components/alerts";
import { Gender } from "@/utils/enums/common.enum";

const AddEmployee = () => {
  const router = useRouter();

  const [alert, setAlert] = React.useState<IAlertMessage>();
  const [loading, setLoading] = React.useState(false);

  const handleAddEmployee = async (newEmployee: IEmployee) => {
    let alertObj: IAlertMessage = {
      severity: "success",
      message: "",
      open: true,
      handleClose: () => setAlert({ ...alert, open: false } as IAlertMessage),
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee`,
        newEmployee
      );

      if (res.data.status) {
        alertObj = {
          ...alertObj,
          message: res.data.message,
        };
        router.replace("/employee/list");
        router.refresh();
      } else {
        alertObj = {
          ...alertObj,
          severity: "error",
          message: res.data.message,
        };
      }

      setLoading(false);
      setAlert(alertObj);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alertObj = {
        ...alertObj,
        severity: "error",
        message:
          (error as ICustomError)?.response?.data?.error ||
          (error as Error).message ||
          "",
      };
      setAlert(alertObj);
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    gender: Gender.Male,
  };

  return (
    <div>
      <EmployeeForm
        initialValues={initialValues}
        onSubmit={handleAddEmployee}
        isEditMode={false}
        loading={loading}
      />
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
};

export default AddEmployee;
