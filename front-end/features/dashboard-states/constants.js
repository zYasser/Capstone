import { IconType } from "react-icons";
import { GoEye } from "react-icons/go";

import { MdSavings } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { MdEnergySavingsLeaf } from "react-icons/md";



export const dashboardStates = [
  {
    id: "1",
    title: "Total Cost",
    value: "$",
    icon: GoEye,
    progress: "up",
    progressValue: "0 %",
  },
  {
    id: "2",
    title: "Expected Monthly Savings",
    value: "$",
    icon: MdSavings,
    progress: "up",
    progressValue: "0 %",
  },
  {
    id: "3",
    title: "Time To Return",
    value: " (_) month",
    icon: CiTimer,
    progress: "up",
    progressValue: "0 %",
  },
  {
    id: "4",
    title: "FootPrint Reduction",
    value: "",
    icon: MdEnergySavingsLeaf,
    progress: "down",
    progressValue: "0 %",
  },
];
