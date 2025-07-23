import type { SVGProps } from "react";
import { LifeBuoy } from "lucide-react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <LifeBuoy {...props} />
  ),
};
