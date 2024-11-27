import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Appointment {
    patientId: string;
    specialistId: string;
    gpId: string;
    reason: string;
    note: string;
}
export default function useAppointment(){

    const schema = yup.object().shape({
        patientId: yup.string().required("Patient is required"),
        specialistId: yup.string().required("Specialist is required"),
        gpId: yup.string().required("General Practitioner is required"),
        reason: yup.string().required("Reason is required"),
        note: yup.string().required("Note is required"),
    });


    const {control, handleSubmit, register,formState: {errors}, setValue} = useForm<Appointment>(
        {
            resolver: yupResolver(schema)
        }
    );

    
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    }

    return {
        control,
        handleSubmit,
        errors,
        onSubmit,
        register,
        setValue
    }
}