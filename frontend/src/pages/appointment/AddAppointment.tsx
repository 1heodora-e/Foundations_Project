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
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    condition: "",
    description: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: Record<string,any>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setOpen(false);
    // Reset form
    setFormData({
      patientId: "",
      doctorId: "",
      condition: "",
      description: "",
    });
  };

  const handleChange = (name:string, value:string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Appointment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Select
              value={formData.patientId}
              onValueChange={(value) => handleChange("patientId", value)}
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
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor</Label>
            <Select
              value={formData.doctorId}
              onValueChange={(value) => handleChange("doctorId", value)}
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
          </div>

          {/* Condition Input */}
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Input
              id="condition"
              value={formData.condition}
              className="text-sm"
              onChange={(e) => handleChange("condition", e.target.value)}
              placeholder="Enter patient's condition"
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter appointment details and notes"
              rows={4}
            />
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Appointment
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}