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
import AddAppointmentForm from "./AddAppointment";

const appointments = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    dateCreated: "2024-11-01",
    doctor: "Dr. Smith",
    condition: "Flu",
    status: "Scheduled",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    dateCreated: "2024-11-10",
    doctor: "Dr. Adams",
    condition: "Headache",
    status: "Completed",
  },
];

const doctors = ["Dr. Smith", "Dr. Adams", "Dr. Johnson"];
const statuses = ["Scheduled", "Completed", "Cancelled"];

export default function Appointments() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

  // Function to get initials and background color based on name
  const getAvatarProps = (name:string) => {
    const initials = name.split(" ").map((n) => n[0]).join("");
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const colorIndex = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return { initials, bgColor: colors[colorIndex] };
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDoctor = !selectedDoctor || appointment.doctor === selectedDoctor;
    const matchesStatus = !selectedStatus || appointment.status === selectedStatus;
    return matchesSearch && matchesDoctor && matchesStatus;
  });

  return (
    <Layout isAuthorized={true}>
      <main className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
            <button 
              onClick={() => setShowNewAppointmentModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors gap-2"
            >
              <FiPlus className="w-4 h-4" />
              New Appointment
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 w-full text-sm"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center px-3 py-[6px] border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 gap-2">
                <Filter className="w-4 h-4 text-xs" />
                Doctor
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Doctor</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {doctors.map((doctor) => (
                  <DropdownMenuCheckboxItem
                    key={doctor}
                    checked={selectedDoctor === doctor}
                    onCheckedChange={() => setSelectedDoctor(selectedDoctor === doctor ? "" : doctor)}
                  >
                    {doctor}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
                    onCheckedChange={() => setSelectedStatus(selectedStatus === status ? "" : status)}
                  >
                    {status}
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
                <TableHead className="font-semibold">Patient</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Date Created</TableHead>
                <TableHead className="font-semibold">Assigned Doctor</TableHead>
                <TableHead className="font-semibold">Condition</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => {
                const { initials, bgColor } = getAvatarProps(appointment.name);
                return (
                  <TableRow key={appointment.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${bgColor}`}>
                          {initials}
                        </div>
                        <span className="font-medium">{appointment.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{appointment.email}</TableCell>
                    <TableCell className="text-gray-600">{appointment.dateCreated}</TableCell>
                    <TableCell className="text-gray-600">{appointment.doctor}</TableCell>
                    <TableCell className="text-gray-600">{appointment.condition}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {appointment.status}
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
      {showNewAppointmentModal && 
        <AddAppointmentForm 
             open={showNewAppointmentModal}
             setOpen={setShowNewAppointmentModal}
        />
      }
    </Layout>
  );
}