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
const departments = [
  { id: 1, name: "General Medicine" },
  { id: 2, name: "Pediatrics" },
  { id: 3, name: "Cardiology" },
];

const appointments = [
  { id: 1, appointment: "AP-23323" },
  { id: 2, appointment: "AP-7821" },
  { id: 3, appointment: "AP-3483" },
];

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddDoctorForm({ open, setOpen }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    departmentId: "",
    appointmentId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setOpen(false);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      departmentId: "",
      appointmentId: "",
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
          <DialogTitle className="text-xl font-semibold">Create New Doctor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              className="text-sm"
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter doctor's name"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formData.email}
              className="text-sm"
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter doctor's email"
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              className="text-sm"
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter doctor's phone number"
            />
          </div>

          {/* Department Selection */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.departmentId}
              onValueChange={(value) => handleChange("departmentId", value)}
            >
              <SelectTrigger id="department" className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id.toString()}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Appointment Selection */}
          <div className="space-y-2">
            <Label htmlFor="appointment">Appointment Time</Label>
            <Select
              value={formData.appointmentId}
              onValueChange={(value) => handleChange("appointmentId", value)}
            >
              <SelectTrigger id="appointment" className="w-full">
                <SelectValue placeholder="Select appointment time" />
              </SelectTrigger>
              <SelectContent>
                {appointments.map((appointment) => (
                  <SelectItem key={appointment.id} value={appointment.id.toString()}>
                    {appointment.appointment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              Create Doctor
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
