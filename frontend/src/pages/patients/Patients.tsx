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
import AddPatientForm from "./AddPatient";

const patients = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    dateCreated: "2024-11-01",
    doctor: "Dr. Smith",
    condition: "Flu",
    appointment: "2024-12-01 10:00 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "098-765-4321",
    dateCreated: "2024-11-10",
    doctor: "Dr. Adams",
    condition: "Headache",
    appointment: "2024-12-02 2:00 PM",
  },
];

const doctors = ["Dr. Smith", "Dr. Adams", "Dr. Johnson"];
const conditions = ["Flu", "Headache", "Cough", "Cold"];

export default function Patients() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);

  // Function to get initials and background color based on name
  const getAvatarProps = (name: string) => {
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

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDoctor = !selectedDoctor || patient.doctor === selectedDoctor;
    const matchesCondition = !selectedCondition || patient.condition === selectedCondition;
    return matchesSearch && matchesDoctor && matchesCondition;
  });

  return (
    <Layout isAuthorized={true}>
      <main className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
            <button 
              onClick={() => setShowNewPatientModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors gap-2"
            >
              <FiPlus className="w-4 h-4" />
              New Patient
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search patients..."
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
                Condition
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Condition</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {conditions.map((condition) => (
                  <DropdownMenuCheckboxItem
                    key={condition}
                    checked={selectedCondition === condition}
                    onCheckedChange={() => setSelectedCondition(selectedCondition === condition ? "" : condition)}
                  >
                    {condition}
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
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Date Created</TableHead>
                <TableHead className="font-semibold">Appointment Date</TableHead>
                <TableHead className="font-semibold">Assigned Doctor</TableHead>
                <TableHead className="font-semibold">Condition</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => {
                const { initials, bgColor } = getAvatarProps(patient.name);
                return (
                  <TableRow key={patient.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${bgColor}`}>
                          {initials}
                        </div>
                        <span className="font-medium">{patient.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{patient.email}</TableCell>
                    <TableCell className="text-gray-600">{patient.phone}</TableCell>
                    <TableCell className="text-gray-600">{patient.dateCreated}</TableCell>
                    <TableCell className="text-gray-600">{patient.appointment}</TableCell>
                    <TableCell className="text-gray-600">{patient.doctor}</TableCell>
                    <TableCell className="text-gray-600">{patient.condition}</TableCell>
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
      {showNewPatientModal && 
        <AddPatientForm 
             open={showNewPatientModal}
             setOpen={setShowNewPatientModal}
        />
      }
    </Layout>
  );
}
