"use client";

import React, { useEffect, useState } from "react";
import { IEmployee } from "@/utils/interfaces/IEmployee";
import axios from "axios";
import { IAlertMessage } from "@/utils/interfaces/IAlertMessage";
import { useParams, useRouter } from "next/navigation";
import { ICustomError } from "@/utils/interfaces/ICustomError";
import AlertMessage from "@/components/alerts";
import { Gender } from "@/utils/enums/common.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import EmployeeForm from "../../(components)/employeeForm";

const EditEmployee = () => {
  const router = useRouter();
  const { id } = useParams();

  const [alert, setAlert] = React.useState<IAlertMessage>();
  const [loading, setLoading] = React.useState(false);

  const [initialValues, setInitialValues] = useState<IEmployee>({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    gender: Gender.Male,
  });
  const employeeState = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    const employee = employeeState.list.find((item) => item.id == id);
    if (employee) setInitialValues(employee);
  }, [employeeState, id]);

  const handleUpdateEmployee = async (employeeData: IEmployee) => {
    let alertObj: IAlertMessage = {
      severity: "success",
      message: "",
      open: true,
      handleClose: () => setAlert({ ...alert, open: false } as IAlertMessage),
    };

    try {
      setLoading(true);
      delete employeeData.id;
      delete employeeData.createdAt;
      delete employeeData.updatedAt;
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee/${id}`,
        employeeData
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
      console.error(error);
      setLoading(false);
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

  return (
    <div>
      {initialValues && (
        <EmployeeForm
          initialValues={initialValues}
          onSubmit={handleUpdateEmployee}
          isEditMode={true}
          loading={loading}
        />
      )}
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

export default EditEmployee;
