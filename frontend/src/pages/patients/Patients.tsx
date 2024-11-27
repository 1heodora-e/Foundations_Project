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
import usePatient from "./hooks/useAddPatients";

const conditions = ["Flu", "Headache", "Cough", "Cold"];

export default function Patients() {
  const [selectedCondition, setSelectedCondition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);

  const {patients, fetchPatients} = usePatient({setOpen: setShowNewPatientModal});

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
    const matchesSearch = patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||            
                          patient.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Emergency Contact</TableHead>
                <TableHead className="font-semibold">Gender</TableHead>
                <TableHead className="font-semibold">Date of Birth</TableHead>
                <TableHead className="font-semibold">Address</TableHead>
                <TableHead className="font-semibold">Created At</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => {
                const { initials, bgColor } = getAvatarProps(patient.firstName+" "+patient.lastName);
                return (
                  <TableRow key={patient.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${bgColor}`}>
                          {initials}
                        </div>
                        <span className="font-medium">{patient.firstName} {patient.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{patient.phoneNumber}</TableCell>
                    <TableCell className="text-gray-600">{patient.emergencyContact}</TableCell>
                    <TableCell className="text-gray-600">{patient.gender}</TableCell>
                    <TableCell className="text-gray-600">{new Date(patient.dateOfBirth).toLocaleDateString().split("/").join("-")}</TableCell>
                    <TableCell className="text-gray-600">{patient.address}</TableCell>
                    <TableCell className="text-gray-600">{new Date(patient.createdAt).toLocaleDateString().split("/").join("-")}</TableCell>
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
             refetch={fetchPatients}
        />
      }
    </Layout>
  );
}
