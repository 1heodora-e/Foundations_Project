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
import Input from "@/components/ui/Input";

// Sample data - replace with your actual data
const doctors = [
  { id: 1, name: "Dr. Smith", specialization: "General Medicine" },
  { id: 2, name: "Dr. Adams", specialization: "Pediatrics" },
  { id: 3, name: "Dr. Johnson", specialization: "Cardiology" },
];

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function AddPatientForm({ open, setOpen }: Props) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    doctorId: "",
    condition: "",
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setOpen(false);
    // Reset form
    setFormData({
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      doctorId: "",
      condition: "",
    });
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Patient</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Patient Name Input */}
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              className="text-sm"
              onChange={(e) => handleChange("patientName", e.target.value)}
              placeholder="Enter patient's name"
            />
          </div>

          {/* Patient Email Input */}
          <div className="space-y-2">
            <Label htmlFor="patientEmail">Patient Email</Label>
            <Input
              id="patientEmail"
              value={formData.patientEmail}
              className="text-sm"
              onChange={(e) => handleChange("patientEmail", e.target.value)}
              placeholder="Enter patient's email"
            />
          </div>

          {/* Patient Phone Input */}
          <div className="space-y-2">
            <Label htmlFor="patientPhone">Patient Phone</Label>
            <Input
              id="patientPhone"
              value={formData.patientPhone}
              className="text-sm"
              onChange={(e) => handleChange("patientPhone", e.target.value)}
              placeholder="Enter patient's phone number"
            />
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
              Save & Open Appointment
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
