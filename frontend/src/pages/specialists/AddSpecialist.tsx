import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { RegistrationFormData } from "../../types";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";

// Sample data - replace with your actual data
// const departments = [
//   { id: 1, name: "General Medicine" },
//   { id: 2, name: "Pediatrics" },
//   { id: 3, name: "Cardiology" },
// ];

// const appointments = [
//   { id: 1, appointment: "AP-23323" },
//   { id: 2, appointment: "AP-7821" },
//   { id: 3, appointment: "AP-3483" },
// ];

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddSpecialistForm({ open, setOpen }: Props) {
  const { register, handleSubmit } = useForm<RegistrationFormData>();
  const { registerUser, isLoading } = useAuth();

  const handleRegister = async (data: RegistrationFormData) => {
    try {
      await registerUser({ ...data, role: "SPECIALIST" });
      toast.success("Account created successfully");
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Specialist
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mt-4 space-y-6"
        >
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">First Name</Label>
            <Input
              id="name"
              className="text-sm"
              placeholder="Enter specialist's first name"
              {...register("firstName")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Last Name</Label>
            <Input
              id="name"
              className="text-sm"
              placeholder="Enter specialist's last name"
              {...register("lastName")}
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="text-sm"
              placeholder="Enter specialist's email"
              {...register("email")}
            />
          </div>

          {/* License Input */}
          <div className="space-y-2">
            <Label htmlFor="phone">License Number</Label>
            <Input
              id="phone"
              className="text-sm"
              placeholder="Enter specialist's phone number"
              {...register("licenseNumber")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Password</Label>
            <Input
              id="phone"
              type="password"
              className="text-sm"
              placeholder="Enter specialist's password"
              {...register("password")}
            />
          </div>
          {/* Department Selection */}
          {/* <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              onValueChange={(value) => handleChange("departmentId", value)}
            >
              <SelectTrigger id="department" className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem
                    key={department.id}
    
                  >
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          {/* Appointment Selection */}
          {/* <div className="space-y-2">
            <Label htmlFor="appointment">Appointment Time</Label>
            <Select
              onValueChange={(value) => handleChange("appointmentId", value)}
            >
              <SelectTrigger id="appointment" className="w-full">
                <SelectValue placeholder="Select appointment time" />
              </SelectTrigger>
              <SelectContent>
                {appointments.map((appointment) => (
                  <SelectItem
                    key={appointment.id}
    
                  >
                    {appointment.appointment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          <DialogFooter className="gap-3">
            <Button
              type="submit"
              onClick={() => setOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Create Specialist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
