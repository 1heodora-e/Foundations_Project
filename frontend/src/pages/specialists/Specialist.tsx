import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import Layout from "@/components/Layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Input from "@/components/ui/Input";
import { ChevronDown, Filter } from "lucide-react";
import AddSpecialistForm from "./AddSpecialist";
import { RegistrationFormData } from "../../types";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

//fetch doctors from the backend

const statuses = ["Active", "On Leave", "Unavailable"];
const departments = ["Cardiology", "Neurology", "Pediatrics"];

export default function Specialists() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewSpecialistModal, setShowNewSpecialistModal] = useState(false);

  const [doctors, setDoctors] = useState<RegistrationFormData[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, [showNewSpecialistModal]);

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get("/users/users");
      const data = response.data;
      //filter the data and remain with the ones with role of specialist
      const specialists: RegistrationFormData[] = data.filter(
        (doctor: RegistrationFormData) => doctor.role === "SPECIALIST"
      );
      setDoctors(specialists);
    } catch (error) {
      console.error("Fetch doctors error: ", error);
    }
  };

  const handleDeleteSpecialist = (id: string) => {
    axiosInstance
      .delete(`/users/users/${id}`)
      .then(() => {
        fetchDoctors();
        toast.success("Specialist deleted successfully");
      })
      .catch((err) => {
        console.error("Specialist doctor error: ", err);
        toast.error(err?.response?.message[0] || "An error occurred");
      });
  }

  // Function to get initials and background color based on name
  const getAvatarProps = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const colorIndex =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;
    return { initials, bgColor: colors[colorIndex] };
  };

  const filteredSpecialists = doctors?.filter((doctor) => {
    const matchesSearch =
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <Layout isAuthorized={true}>
      <main className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Specialists
            </h1>
            <button
              onClick={() => setShowNewSpecialistModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors gap-2"
            >
              <FiPlus className="w-4 h-4" />
              New Specialist
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search specialists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 w-full text-sm"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center px-3 py-[6px] border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 gap-2">
                <Filter className="w-4 h-4 text-xs" />
                Status
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatus === status}
                    onCheckedChange={() =>
                      setSelectedStatus(selectedStatus === status ? "" : status)
                    }
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center px-3 py-[6px] border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 gap-2">
                <Filter className="w-4 h-4 text-xs" />
                Department
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Department</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {departments.map((department) => (
                  <DropdownMenuCheckboxItem
                    key={department}
                    checked={selectedDepartment === department}
                    onCheckedChange={() =>
                      setSelectedDepartment(
                        selectedDepartment === department ? "" : department
                      )
                    }
                  >
                    {department}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Specialist</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpecialists.map((doctor, index) => {
                const { initials, bgColor } = getAvatarProps(
                  `${doctor.firstName} ${doctor.lastName}`
                );
                return (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${bgColor}`}
                        >
                          {initials}
                        </div>
                        <span className="font-medium">{doctor.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {doctor.email}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {doctor.licenseNumber}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {doctor.specialization}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}
                      >
                        AVAILABLE
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded-md text-gray-600 hover:text-blue-600 transition-colors">
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteSpecialist(doctor?.id as string)} className="p-1 hover:bg-gray-100 rounded-md text-gray-600 hover:text-red-600 transition-colors">
                          <FiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
      {showNewSpecialistModal && (
        <AddSpecialistForm
          open={showNewSpecialistModal}
          setOpen={setShowNewSpecialistModal}
        />
      )}
    </Layout>
  );
}
