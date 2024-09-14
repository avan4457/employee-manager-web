"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IEmployee } from "@/utils/interfaces/IEmployee";
import { Gender } from "@/utils/enums/common.enum";
import { getEnumKeyByValue } from "@/utils/common";

interface EmployeeTableProps {
  employees: IEmployee[];
  setDelete: (id: number | undefined | string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  setDelete,
}) => {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.email}>
              <TableCell>
                {employee?.photo ? (
                  <Image
                    src={employee.photo}
                    alt={employee.firstName + "-image"}
                    width={40}
                    height={40}
                  />
                ) : (
                  <Avatar className="w-[40px] h-[40px]" />
                )}
              </TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.number}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                {getEnumKeyByValue(Gender, employee.gender as Gender)}
              </TableCell>
              <TableCell className="flex justify-start items-center gap-2.5">
                <Button
                  variant="contained"
                  onClick={() => router.push(`edit/${employee.id}`)}
                >
                  Edit
                </Button>
                <Delete
                  onClick={() => setDelete(employee.id)}
                  className="text-danger"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
