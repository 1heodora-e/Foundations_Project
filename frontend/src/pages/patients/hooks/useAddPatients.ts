import { axiosInstance } from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";


interface Patient {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    emergencyContact: string;
    emergencyPhone: string;
}

export interface IPatient extends Patient {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    appointments: [];
}

interface Props {
    setOpen: (open: boolean) => void;
    refetch?: () => void;
}

export default function usePatient({setOpen, refetch}: Props){
    const [isLoading, setIsLoading] = useState(false);
    const [patients, setPatients] = useState<IPatient[]>([]);

    const schema = yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      gender: yup.string().required("Gender is required"),
      dateOfBirth: yup.string().required("Date of birth is required"),
      phoneNumber: yup.string().required("Phone number is required"),
      address: yup.string().required("Address is required"),
      emergencyContact: yup.string().required("Emergency contact is required"),
      emergencyPhone: yup.string().required("Emergency phone is required"),
    });

    const {control, handleSubmit, register,formState: {errors}, setValue, reset} = useForm<Patient>(
        {
            resolver: yupResolver(schema)
        }
    );

    
    const onSubmit = (data: FieldValues) => {
        setIsLoading(true);
        axiosInstance.post("/patients", data)
        .then(() => {
            setIsLoading(false);
            reset();
            setOpen(false);
            if(refetch){
                refetch();
            }
            toast.success("Patient added successfully");
        }
        )
        .catch((err) => {
            setIsLoading(false);
            toast.error(err?.response?.message[0] || "An error occurred");
        })

    }

    const fetchPatients = () => {
        axiosInstance.get("/patients")
        .then((response) => {
            setPatients(response.data);
        })
        .catch((err) => {
            toast.error(err?.response?.message[0] || "An error occurred");
        })
    }

    useEffect(() => {
        fetchPatients();
    }, [])

    const handleDeletePatients = (id: string) => {
        setIsLoading(true);
        axiosInstance.delete(`/patients/${id}`)
        .then(() => {
            setIsLoading(false);
            fetchPatients();
            toast.success("Patient deleted successfully");
        })
        .catch((err) => {
            setIsLoading(false);
            toast.error(err?.response?.message[0] || "An error occurred");
        })
    }


    return {
        control,
        handleSubmit,
        errors,
        onSubmit,
        register,
        setValue,
        isLoading,
        patients,
        fetchPatients,
        handleDeletePatients
    }
}