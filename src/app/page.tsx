"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
        Welcome to Employee Manager
      </Typography>
      <Button
        size="large"
        className="bg-primary"
        onClick={() => router.push("/employee/list")}
        variant="contained"
      >
        Get started
      </Button>
    </div>
  );
}
