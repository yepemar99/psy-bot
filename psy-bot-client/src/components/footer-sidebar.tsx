import Avatar from "./avatar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";

const Footer = () => {
  const { user, logout } = useUser();

  const initials = getInitials(
    [user?.name || "", user?.lastname || ""].join(" "),
    2
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton asChild>
                  <div className="w-full flex items-center justify-start gap-1 hover:bg-gray-100 transition-colors cursor-pointer">
                    <Avatar src="bg-green-500" name={initials} />
                    <h6 className="text-md capitalize">
                      {[user?.name || "", user?.lastname || ""].join(" ")}
                    </h6>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuItem onClick={handleLogout}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Footer;
