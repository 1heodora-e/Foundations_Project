import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import  Input  from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import useAppointment from "./hooks/useAppointments";

// Sample data - replace with your actual data
const patients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Robert Johnson" },
];

const doctors = [
  { id: 1, name: "Dr. Smith", specialization: "General Medicine" },
  { id: 2, name: "Dr. Adams", specialization: "Pediatrics" },
  { id: 3, name: "Dr. Johnson", specialization: "Cardiology" },
];

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export default function AddAppointmentForm({open, setOpen}: Props) {
  const {handleSubmit, onSubmit, control, errors, register, setValue} = useAppointment();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Appointment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Select
              {...register("patientId")}
              name="patientId"
              onValueChange={(value) => setValue("patientId", value)}
            >
              <SelectTrigger id="patient" className="w-full">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.patientId && (
              <p className="text-red-500 text-sm">{errors.patientId.message}</p>
            )  
            }
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label htmlFor="doctor">Specialist</Label>
            <Select
              // onValueChange={(value) => handleChange("doctorId", value)}
              {...register("specialistId")}
              name="specialistId"
              onValueChange={(value) => setValue("specialistId", value)}
            >
              <SelectTrigger id="doctor" className="w-full">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id.toString()}>
                    <div>
                      <span>{doctor.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({doctor.specialization})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.specialistId && (
              <p className="text-red-500 text-sm">{errors.specialistId.message}</p>
            )
            }
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient">General Practitioner</Label>
            <Select 
              {...register("gpId")}
              name="gpId"
              onValueChange={(value) => setValue("gpId", value)}
            >
              <SelectTrigger id="patient" className="w-full">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((gp) => (
                  <SelectItem key={gp.id} value={gp.id.toString()}>
                    {gp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gpId && (
              <p className="text-red-500 text-sm">{errors.gpId.message}</p>
            )  
            }
          </div>

          {/* Condition Input */}
          <div className="space-y-2">
            <Label htmlFor="condition">Reason</Label>
            <Input
              id="reason"
              // value={formData.condition}
              className="text-sm"
              // onChange={(e) => handleChange("condition", e.target.value)}
              {...register("reason")}
              name="reason"
              placeholder="Enter patient's condition"
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              // value={formData.description}
              // onChange={(e) => handleChange("description", e.target.value)}
              {...register("note")}
              name="note"
              placeholder="Enter appointment details and notes"
              rows={4}
            />
            {errors.note && (
              <p className="text-red-500 text-sm">{errors.note.message}</p>
            )}
          </div>

          <DialogFooter className="gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              // disable if errors is not an empty object
              disabled={Object.keys(errors).length > 0}
              className={Object.keys(errors)?.length < 0 ? "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" : "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"}
            >
              Create Appointment
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}