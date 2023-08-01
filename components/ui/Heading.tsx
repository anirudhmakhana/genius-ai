import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor = "text-black",
  bgColor = "bg-white",
}: HeadingProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={(cn("p-2 rounded-md w-fit"), bgColor)}>
        <Icon className={(cn("w-10 h-10"), iconColor)} />
      </div>

      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
