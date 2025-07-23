import type { SVGProps } from "react";
import { Stethoscope } from "lucide-react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <Stethoscope {...props} />
  ),
};
