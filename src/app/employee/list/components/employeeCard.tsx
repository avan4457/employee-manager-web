"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IEmployee } from "@/utils/interfaces/IEmployee";
import { Delete, ManageAccounts } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface IEmployeeCardProps extends IEmployee {
  setDelete: (id: number | undefined | string) => void;
}

export default function EmployeeCard(props: IEmployeeCardProps) {
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 345, width: 250 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.photo}
        title={`${props.firstName}-${props.lastName}-image`}
      />
      <CardContent>
        <Typography className="truncate" variant="body2" component="div">
          <ul>
            <li>{`${props.firstName} ${props.lastName}`}</li>
            <li>{props.email}</li>
            <li>{props.number}</li>
            <li>{props.gender}</li>
          </ul>
        </Typography>
      </CardContent>
      <CardActions className="items-start justify-end">
        <div
          onClick={() => props.setDelete(props.id)}
          className="flex bg-danger rounded-full p-2"
        >
          <Delete className="text-white" />
        </div>
        <div
          className="flex bg-success rounded-full p-2"
          onClick={() => router.push(`edit/${props.id}`)}
        >
          <ManageAccounts className="text-white" />
        </div>
      </CardActions>
    </Card>
  );
}
