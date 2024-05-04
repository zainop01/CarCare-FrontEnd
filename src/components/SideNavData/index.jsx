import Icons from "../../helper/icons";


const menuItems = [
    {
        path:'/',
        name:"Dashboard",
        icon: <Icons.MdIcons.MdDashboard />

    },
    {
        path:'/customer',
        name:"Customer",
        icon: <Icons.FaIcons.FaUsers />

    },
    {
        path:'/remainder',
        name:"Remainder",
        icon: <Icons.FaIcons.FaBrain />

    },
    {
        path:'/vehicle',
        name:"Vehicle",
        icon: <Icons.FaIcons.FaTruck />

    },
    {
        path:'/expense',
        name:"Expense",
        icon: <Icons.BsIcons.BsFileEarmarkMedicalFill />

    },
    {
        path:'/services',
        name:"Services",
        icon: <Icons.MdIcons.MdOutlineMiscellaneousServices />

    },
    {
        path:'/product',
        name:"Product",
        icon: <Icons.GiIcons.GiCarWheel />

    },
];

export default menuItems;
