import { MdEventNote, MdLocalHospital, MdPeople, MdPersonAdd } from "react-icons/md";

export default function StatsCards(){
    const stats = [
        { label: 'Appointments', value: 128, icon: MdEventNote },
        { label: 'New Patients', value: 72, icon: MdPersonAdd },
        { label: 'Doctors', value: 36, icon: MdPeople },
        { label: 'Departments', value: 12, icon: MdLocalHospital },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 rounded-md shadow-sm flex items-center space-x-4">
                    <stat.icon className="text-3xl text-switch" />
                    <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-xl font-light text-switch">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )


}