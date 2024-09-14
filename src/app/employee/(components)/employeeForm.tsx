"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { IEmployee } from "@/utils/interfaces/IEmployee";
import { Gender } from "@/utils/enums/common.enum";
import { useRouter } from "next/navigation";

interface EmployeeFormProps {
  initialValues: IEmployee;
  onSubmit: (values: IEmployee) => void;
  isEditMode: boolean;
  loading: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onSubmit,
  isEditMode,
  loading,
}) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    gender: "",
  });

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      gender: "",
    };

    // Regex for alphabetic characters only
    const alphabetRegex = /^[A-Za-z]+$/;

    // First Name Validation
    if (!formValues.firstName) {
      errors.firstName = "First name is required";
      valid = false;
    } else if (!alphabetRegex.test(formValues.firstName)) {
      errors.firstName = "First name should only contain alphabets";
      valid = false;
    } else if (
      formValues.firstName.length < 6 ||
      formValues.firstName.length > 10
    ) {
      errors.firstName = "First name should be between 6 and 10 characters";
      valid = false;
    }

    // Last Name Validation
    if (!formValues.lastName) {
      errors.lastName = "Last name is required";
      valid = false;
    } else if (!alphabetRegex.test(formValues.lastName)) {
      errors.lastName = "Last name should only contain alphabets";
      valid = false;
    } else if (
      formValues.lastName.length < 6 ||
      formValues.lastName.length > 10
    ) {
      errors.lastName = "Last name should be between 6 and 10 characters";
      valid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formValues?.email && !emailRegex.test(formValues?.email)) {
      errors.email = "Invalid email address";
      valid = false;
    }

    // Phone Number Validation (Sri Lankan number)
    // Sri Lankan phone numbers start with 0 or +94 and are followed by 9 digits.
    const numberRegex = /^(?:7|0|(?:\+94))[0-9]{9}$/;
    if (formValues?.number && !numberRegex.test(formValues?.number)) {
      errors.number = "Invalid phone number";
      valid = false;
    }

    // Gender Validation
    if (!formValues.gender) {
      errors.gender = "Gender is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formValues);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Button
        variant="contained"
        className="rounded-3xl self-end"
        onClick={() => router.push("/employee/list")}
      >
        List View
      </Button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full md:w-1/2 items-center mx-auto"
      >
        <TextField
          label="First Name"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="number"
          value={formValues.number}
          onChange={handleChange}
          error={!!errors.number}
          helperText={errors.number}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth error={!!errors.gender} margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formValues.gender}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                gender: e.target.value as Gender,
              }))
            }
            label="Gender"
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          className="text-primary border-primary self-end"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : isEditMode ? (
            "SAVE"
          ) : (
            "ADD"
          )}
        </Button>
      </form>
    </div>
  );
};

export default EmployeeForm;
