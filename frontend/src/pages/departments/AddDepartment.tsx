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

export default function AddDepartment({ open, setOpen }: Props) {
  const [formData, setFormData] = useState({
    departmentName: "",
    description: "",
    headOfDepartmentId: "",
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setOpen(false);
    // Reset form
    setFormData({
      departmentName: "",
      description: "",
      headOfDepartmentId: "",
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
          <DialogTitle className="text-xl font-semibold">Create New Department</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Department Name Input */}
          <div className="space-y-2">
            <Label htmlFor="departmentName">Department Name</Label>
            <Input
              id="departmentName"
              value={formData.departmentName}
              className="text-sm"
              onChange={(e) => handleChange("departmentName", e.target.value)}
              placeholder="Enter department name"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              className="text-sm w-full border border-gray-300 rounded-lg p-2"
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter department description"
            />
          </div>

          {/* Head of Department Selection */}
          <div className="space-y-2">
            <Label htmlFor="headOfDepartment">Head of Department</Label>
            <Select
              value={formData.headOfDepartmentId}
              onValueChange={(value) => handleChange("headOfDepartmentId", value)}
            >
              <SelectTrigger id="headOfDepartment" className="w-full">
                <SelectValue placeholder="Select head of department" />
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
              Save Department
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
