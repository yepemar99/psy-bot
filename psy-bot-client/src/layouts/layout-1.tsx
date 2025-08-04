/* eslint-disable react-hooks/exhaustive-deps */
import { AppSidebar } from "@/components/app-sidebar";
import Dialog from "@/components/dialog";
import Footer from "@/components/footer-sidebar";
import Header from "@/components/header";
import { default as SidebarHeader } from "@/components/header-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import usePaginationChats from "@/hooks/usePaginationChats";
import { useUser } from "@/hooks/useUser";
import { routes } from "@/routes";
import type {
  GroupedSidebarItem,
  ISidebarItem,
} from "@/types/common/sidebarItem.interface";
import { ArrowBigDown, SquarePen, Trash } from "lucide-react";
import { Outlet } from "react-router-dom";

const Layout1 = () => {
  const { user } = useUser();
  const {
    isReachingEnd,
    showConfirmation,
    data: chats,
    onDelete,
    toggleConfirmation,
    handleDelete,
    handleLoadMore,
  } = usePaginationChats({
    userId: user?.id || "",
  });

  const dynamicNavs: ISidebarItem[] = chats.map((chat) => ({
    id: chat?.id || "",
    title: chat?.name || "Chat",
    url: `${routes.chat}/${chat?.id}`,
  }));

  return (
    <>
      <Dialog
        open={showConfirmation}
        onOpenChange={toggleConfirmation}
        title="Eliminar"
        description="¿Estás seguro de que deseas eliminar este chat?"
        footer={
          <div>
            <Button onClick={onDelete} variant="destructive">
              Eliminar
            </Button>
          </div>
        }
      />
      <SidebarProvider>
        <AppSidebar
          header={<SidebarHeader />}
          endItem={<Trash />}
          onClick={handleDelete}
          itemGroups={[
            navItems[0],
            {
              title: dynamicNavs.length > 0 ? "Chats" : "",
              items: dynamicNavs,
            },
          ]}
          endGroup={
            !isReachingEnd && (
              <Button onClick={handleLoadMore} variant={"ghost"}>
                <ArrowBigDown />
                Cargar más
                <ArrowBigDown />
              </Button>
            )
          }
          footer={
            <div>
              <Separator />
              <Footer />
            </div>
          }
        />
        <main className="w-full">
          <Header />
          <Separator />
          <div className="w-full mt-2">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default Layout1;

const navItems: GroupedSidebarItem[] = [
  {
    title: "",
    items: [
      {
        id: "new-chat",
        title: "Nuevo chat",
        url: routes.home,
        icon: SquarePen,
      },
    ],
  },
];
