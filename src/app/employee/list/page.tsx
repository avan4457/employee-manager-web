import EmployeeView from "./components/employeeView";

export default async function EmployeeList() {
  let employees = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }

    const data = await res.json();
    employees = data.data;
  } catch (err) {
    console.error("Error fetching employees:", err);
  }

  return <EmployeeView employees={employees} />;
}
