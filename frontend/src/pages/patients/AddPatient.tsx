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
import usePatient from "./hooks/useAddPatients";

// Sample data - replace with your actual data

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
}

export default function AddPatientForm({ open, setOpen, refetch }: Props) {
  const { register, setValue, errors, handleSubmit, onSubmit, isLoading } = usePatient({setOpen, refetch});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Patient</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* First Row */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                className="text-sm"
                placeholder="Enter first name"
                {...register("firstName")}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                className="text-sm"
                placeholder="Enter last name"
                {...register("lastName")}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Second Row */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => setValue("gender", value)}>
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                className="text-sm"
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
            </div>
          </div>

          {/* Third Row */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                className="text-sm"
                placeholder="Enter phone number"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                className="text-sm"
                placeholder="Enter address"
                {...register("address")}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
          </div>

          {/* Fourth Row */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                className="text-sm"
                placeholder="Enter emergency contact name"
                {...register("emergencyContact")}
              />
              {errors.emergencyContact && <p className="text-red-500 text-sm">{errors.emergencyContact.message}</p>}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                className="text-sm"
                placeholder="Enter emergency phone number"
                {...register("emergencyPhone")}
              />
              {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone.message}</p>}
            </div>
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
             {isLoading ? "Loading..." : "Create Patient"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
