// Icons
import {LayoutDashboard, Contact2, Home, FolderKanban, BadgeHelp, Hammer, Users2, CalendarCheck2, FileText, FileBarChart2, PencilLine} from "lucide-react";

type NavLinks = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

export const navlinks: NavLinks[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={25} />,
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: <Contact2 size={25} />,
  },
  {
    title: "Properties",
    path: "/properties",
    icon: <Home size={25} />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <FolderKanban size={25} />,
  },
  {
    title: "Leads",
    path: "/leads",
    icon: <BadgeHelp size={25} />,
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: <Hammer size={25} />,
  },
  {
    title: "Sub-Contractor",
    path: "/sub-contractor",
    icon: <Users2 size={25} />,
  },
  {
    title: "Appointments",
    path: "/appointments",
    icon: <CalendarCheck2 size={25} />,
  },
  {
    title: "Material Profiles",
    path: "/material-profile",
    icon: <FileText size={25} />,
  },
  {
    title: "Data Match",
    path: "/data-match",
    icon: <FileBarChart2 size={25} />,
  },
  {
    title: "Signature Requests",
    path: "/signature-requests",
    icon: <PencilLine size={25} />,
  },
];
