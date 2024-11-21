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
import AddDepartmentForm from "./AddDepartment"; // Assuming you have a form for adding new departments

// Sample departments data
const departments = [
  {
    id: 1,
    name: "Cardiology",
    dateOpened: "2024-01-01",
    headOfDepartment: "Dr. Smith",
    status: "Active",
    numberOfCases: 120,
  },
  {
    id: 2,
    name: "Neurology",
    dateOpened: "2023-05-15",
    headOfDepartment: "Dr. Johnson",
    status: "Inactive",
    numberOfCases: 80,
  },
];

const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Adams"];
const statuses = ["Active", "Inactive"];

export default function Departments() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewDepartmentModal, setShowNewDepartmentModal] = useState(false);

  // Function to filter departments based on the search query, doctor, and status
  const filteredDepartments = departments.filter((department) => {
    const matchesSearch = department.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDoctor = !selectedDoctor || department.headOfDepartment === selectedDoctor;
    const matchesStatus = !selectedStatus || department.status === selectedStatus;
    return matchesSearch && matchesDoctor && matchesStatus;
  });

  return (
    <Layout isAuthorized={true}>
      <main className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
            <button 
              onClick={() => setShowNewDepartmentModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors gap-2"
            >
              <FiPlus className="w-4 h-4" />
              New Department
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 w-full text-sm"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center px-3 py-[6px] border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 gap-2">
                <Filter className="w-4 h-4 text-xs" />
                Head of Department
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Head of Department</DropdownMenuLabel>
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
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Date Opened</TableHead>
                <TableHead className="font-semibold">Head of Department</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Number of Cases</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((department) => (
                <TableRow key={department.id} className="hover:bg-gray-50">
                  <TableCell>{department.name}</TableCell>
                  <TableCell className="text-gray-600">{department.dateOpened}</TableCell>
                  <TableCell className="text-gray-600">{department.headOfDepartment}</TableCell>
                  <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          department.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {department.status}
                      </span>
                    </TableCell>
                  <TableCell className="text-gray-600">{department.numberOfCases}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      {showNewDepartmentModal && 
        <AddDepartmentForm 
             open={showNewDepartmentModal}
             setOpen={setShowNewDepartmentModal}
        />
      }
    </Layout>
  );
}
