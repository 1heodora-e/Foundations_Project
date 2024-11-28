/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPatient } from "@/pages/patients/hooks/useAddPatients";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

interface Appointment {
    patientId: string;
    specialistId: string;
    gpId: string;
    date: string;
    reason: string;
    notes: string;
}

export interface IAppointment extends Appointment {
    id: string;
    createdAt: string;
    updatedAt: string;
    patient: IPatient;
    specialist: User;
    gp: User;
    status: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    specialization?: string;
    licenseNumber?: string;
    phoneNumber?: string;
    hospitalAffiliation?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface Props {
    setOpen: (open: boolean) => void;
    refetch?: () => void;
}  
export default function useAppointment({setOpen, refetch}: Props){

    const [patientsOptions, setPatientsOptions] = useState<{name:string, value:string}[]>([]);
    const [specialistsOptions, setSpecialistsOptions] = useState<{name:string, value:string}[]>([]);
    const [gpsOptions, setGpsOptions] = useState<{name:string, value:string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [appointments, setAppointments] = useState<IAppointment[]>([]);

    const schema = yup.object().shape({
        patientId: yup.string().required("Patient is required"),
        specialistId: yup.string().required("Specialist is required"),
        gpId: yup.string().required("General Practitioner is required"),
        date: yup.string().required("Date is required"),
        reason: yup.string().required("Reason is required"),
        notes: yup.string().required("Notes is required"),
    });


    const {control, handleSubmit, register,formState: {errors}, setValue, reset} = useForm<Appointment>(
        {
            resolver: yupResolver(schema)
        }
    );

    const getPatientsAndFormatPatientsSelectOptions = async () => {
        axiosInstance.get("/patients")
        .then((response) => {
            const patients = response.data as IPatient[];
            const options = patients.map((patient) => {
                return {
                    name: `${patient.firstName} ${patient.lastName}`,
                    value: patient.id
                }
            });
            setPatientsOptions(options);
        })
    }

    const getUsersAndExtractSpecialistsAndGpsAndFormSelectOptions = async () => {
        axiosInstance.get("/users/users")
        .then((response) => {
            const users = response.data as User[];
            const specialists = users.filter((user) => user.role === "SPECIALIST");
            const gps = users.filter((user) => user.role === "GP");
            const specialistsOptions = specialists.map((specialist) => {
                return {
                    name: `${specialist.firstName} ${specialist.lastName}`,
                    value: specialist.id
                }
            });
            const gpsOptions = gps.map((gp) => {
                return {
                    name: `${gp.firstName} ${gp.lastName}`,
                    value: gp.id
                }
            });
            setSpecialistsOptions(specialistsOptions);
            setGpsOptions(gpsOptions);
        })
    }

    
    const onSubmit = (data: FieldValues) => {
        setIsLoading(true);
        axiosInstance.post("/appointments", {...data, date: new Date(data.date)})
        .then(() => {
            setIsLoading(false);
            setOpen(false);
            toast.success("Appointment added successfully");
            reset();
            if(refetch){
                refetch();
            }
        })
        .catch((err) => {
            setIsLoading(false);
            toast.error(err?.response?.message[0] || "An error occurred");
        })
    }

    const fetchAppointments = () => {
        axiosInstance.get("/appointments")
        .then((response) => {
            setAppointments(response.data);
        })
    }

    useEffect(() => {
        getPatientsAndFormatPatientsSelectOptions();
        getUsersAndExtractSpecialistsAndGpsAndFormSelectOptions();
        fetchAppointments();
    },[])

    return {
        control,
        handleSubmit,
        errors,
        onSubmit,
        register,
        setValue,
        patientsOptions,
        specialistsOptions,
        gpsOptions,
        isLoading,
        appointments,
        refetch: fetchAppointments
    }
}