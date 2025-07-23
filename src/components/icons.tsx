import type { SVGProps } from "react";
import { Caduceus } from "lucide-react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <Caduceus {...props} />
  ),
};
