"use client";

import { ViewMode } from "@/utils/enums/common.enum";
import { Apps, FormatListBulleted } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import * as React from "react";

interface IToolBarProps {
  view: ViewMode;
  setView: (view: ViewMode) => void;
}

export default function Toolbar({ view, setView }: IToolBarProps) {
  const router = useRouter();

  return (
    <div className="flex justify-end items-center gap-5">
      <Button
        variant="contained"
        className="rounded-2xl"
        onClick={() => router.push("add")}
      >
        ADD EMPLOYEE
      </Button>
      <div
        className="flex rounded-full p-2 bg-primary"
        onClick={() =>
          setView(view === ViewMode.Grid ? ViewMode.List : ViewMode.Grid)
        }
      >
        {view === ViewMode.List ? (
          <Apps className="text-white" />
        ) : (
          <FormatListBulleted className="text-white" />
        )}
      </div>
    </div>
  );
}
