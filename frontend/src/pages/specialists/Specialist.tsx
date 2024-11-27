import { useState } from "react";
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

const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    email: "smith@example.com",
    phone: "123-456-7890",
    assignedAppointment: "AP-101",
    currentPatient: "John Doe",
    department: "General Practice",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Adams",
    email: "adams@example.com",
    phone: "987-654-3210",
    assignedAppointment: "AP-202",
    currentPatient: "Jane Smith",
    department: "Internal Medicine",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Brown",
    email: "brown@example.com",
    phone: "456-789-1234",
    assignedAppointment: "AP-303",
    currentPatient: "David Garcia",
    department: "Dermatology",
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Clark",
    email: "clark@example.com",
    phone: "321-654-9870",
    assignedAppointment: "AP-404",
    currentPatient: "Bob Lee",
    department: "Orthopedics",
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Miller",
    email: "miller@example.com",
    phone: "654-321-9870",
    assignedAppointment: "AP-505",
    currentPatient: "George Miller",
    department: "Pediatrics",
    status: "On Leave",
  },
  {
    id: 6,
    name: "Dr. Wilson",
    email: "wilson@example.com",
    phone: "789-123-4567",
    assignedAppointment: "AP-606",
    currentPatient: "Fiona Wilson",
    department: "Neurology",
    status: "Active",
  },
  {
    id: 7,
    name: "Dr. Evans",
    email: "evans@example.com",
    phone: "852-963-7410",
    assignedAppointment: "AP-707",
    currentPatient: "Chris Evans",
    department: "Sports Medicine",
    status: "Active",
  },
];

const statuses = ["Active", "On Leave", "Unavailable"];
const departments = ["Cardiology", "Neurology", "Pediatrics"];

export default function Specialists() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewSpecialistModal, setShowNewSpecialistModal] = useState(false);

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

  const filteredSpecialists = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || doctor.status === selectedStatus;
    const matchesDepartment =
      !selectedDepartment || doctor.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
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
                <TableHead className="font-semibold">
                  Assigned Appointment
                </TableHead>
                <TableHead className="font-semibold">Current Patient</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpecialists.map((doctor) => {
                const { initials, bgColor } = getAvatarProps(doctor.name);
                return (
                  <TableRow key={doctor.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${bgColor}`}
                        >
                          {initials}
                        </div>
                        <span className="font-medium">{doctor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {doctor.email}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {doctor.phone}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {doctor.assignedAppointment}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {doctor.currentPatient}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {doctor.department}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          doctor.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : doctor.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doctor.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded-md text-gray-600 hover:text-blue-600 transition-colors">
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-md text-gray-600 hover:text-red-600 transition-colors">
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
