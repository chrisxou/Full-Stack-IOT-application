import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


export const SidebarData = [

    {
        title: "Home",
        path: "/dashboard",
        icon: <GridViewIcon/>,
    },
    {
        title: "Devices",
        path: "/devices",
        icon: <DevicesOtherIcon/>,
    },
    {
        title: "Alerts",
        path: "/alerts",
        icon: <WarningAmberIcon/>,
    },
    

]



