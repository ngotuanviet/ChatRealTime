import { User } from "lucide-react";


function SidebarSkeleton() {
    const skeletonContants = Array(8).fill(null);
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col trasition-all duration-200">
            {/* header */}
            <div className=" border-b border-base-300 w-full p-5 ">
                <div className="flex items-center gap-2">
                    <User className=" w-6 h-6" />
                    <span className=" font-medium hidden lg:block">Liên hệ</span>
                </div>
            </div>
            {/* Contacts */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContants.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        {/* avatar */}
                        <div className="relative mx-auto lg:mx-0 ">
                            <div className="skeleton size-12 rounded-full" />
                        </div>
                        {/* info */}
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2" />
                            <div className=" skeleton h-3 w-16 " />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default SidebarSkeleton
