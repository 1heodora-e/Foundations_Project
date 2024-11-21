import { Search, Bell, Settings, LogOut, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from '@/assets/avatar.jpg';

export default function DashboardNav() {

    return (
        <section className="w-full  py-4 px-8 flex items-center justify-between">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm w-[300px] pl-10 pr-4 py-2 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                />
            </div>

            {/* Right Section - Notifications & Profile */}
            <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <div className="relative cursor-pointer">
                    <Bell className="w-6 h-6 text-gray-400 hover:text-gray-900 transition-colors" />
                    {/* Notification Badge */}
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                </div>

                {/* Avatar Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all">
                            <img
                                src={Avatar}
                                alt="User avatar"
                                className="w-full h-full object-cover border-2 border-gray-400 rounded-full"
                            />
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-48 mt-2">
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>
    );
}