import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { GroupedSidebarItem } from "@/types/common/sidebarItem.interface";
import { Link } from "react-router-dom";
import type React from "react";
import { Button } from "./ui/button";

interface AppSidebarProps {
  itemGroups?: GroupedSidebarItem[];
  endGroup?: React.ReactNode;
  endItem?: React.ReactNode;
  onClick?: (id: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function AppSidebar({
  itemGroups = [],
  endGroup,
  endItem,
  header,
  footer,
  onClick = () => {},
}: AppSidebarProps) {
  return (
    <Sidebar>
      {header && <SidebarHeader>{header}</SidebarHeader>}
      <SidebarContent>
        {itemGroups.map((group, i) => (
          <SidebarGroup
            className={i !== 0 ? "mt-4" : ""}
            key={`${group.title}-${i}`}
          >
            <SidebarGroupContent>
              {group.title && (
                <SidebarGroupLabel>
                  <h6 className="text-md">{group.title}</h6>
                </SidebarGroupLabel>
              )}
              <SidebarMenu>
                {group.items.map((item, index) => (
                  <SidebarMenuItem key={item.title + index} className="group">
                    <SidebarMenuButton asChild>
                      <div className="flex items-center w-full">
                        <Link
                          to={item.url}
                          className="flex items-center gap-2 flex-1 overflow-hidden"
                        >
                          {item.icon && <item.icon className="shrink-0" />}
                          <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                            {item.title}
                          </span>
                        </Link>
                        {endItem && i !== 0 && (
                          <Button
                            onClick={() => onClick(item?.id || "")}
                            size="icon"
                            variant={"ghost"}
                            className="ml-auto"
                          >
                            {endItem}
                          </Button>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {endGroup && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>{endGroup}</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
    </Sidebar>
  );
}
