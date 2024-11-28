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


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    refetch?: () => void;
}
export default function AddAppointmentForm({open, setOpen, refetch}: Props) {
  const {handleSubmit, onSubmit, errors, register, setValue, patientsOptions, specialistsOptions, gpsOptions, isLoading} = useAppointment({refetch, setOpen});

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
                {patientsOptions.map((patient) => (
                  <SelectItem key={patient.value} value={patient.value}>
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
                {specialistsOptions.map((specialist) => (
                  <SelectItem key={specialist.value} value={specialist.value}>
                    <div>
                      <span>{specialist.name}</span>
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
                {gpsOptions.map((gp) => (
                  <SelectItem key={gp.value} value={gp.value}>
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

          <div className="flex-1 space-y-2">
              <Label htmlFor="dateOfBirth">Date</Label>
              <Input
                id="date"
                type="date"
                className="text-sm"
                {...register("date")}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
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
              id="notes"
              // value={formData.description}
              // onChange={(e) => handleChange("description", e.target.value)}
              {...register("notes")}
              name="notes"
              placeholder="Enter appointment details and notes"
              rows={4}
            />
            {errors.notes && (
              <p className="text-red-500 text-sm">{errors.notes.message}</p>
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
              {isLoading ? "Loading..." : "Save"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}