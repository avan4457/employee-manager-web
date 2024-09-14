import axios from "axios";
import EmployeeView from "./components/employeeView";

export default async function EmployeeList() {
  let employees = [];
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee`
    );
    employees = res.data.data;
  } catch (err) {
    console.error(err);
  }

  return <EmployeeView employees={employees} />;
}
