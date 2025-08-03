import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  return (
    <div className="w-full px-4 py-2">
      <div className="flex items-center justify-start">
        <SidebarTrigger />
        <h6 className="text-lg ">PSY-BOT</h6>
      </div>
    </div>
  );
};

export default Header;
