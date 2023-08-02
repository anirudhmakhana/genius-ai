import { Navbar } from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      {/* We have padding left 72 here so we can push the content 72 since the width of the sidebar is 72 as well */}
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default layout;
