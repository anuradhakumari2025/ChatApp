import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";
import { dashboardData } from "../../constants/dummyChats";
import { transformImage } from "../../lib/feature";

const UserManagement = () => {
  const [rows, setRows] = useState([]);
   const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 140,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "table-header",
      width: 150,
      renderCell:(params)=><Avatar alt={params.row.name} src={params.row.avatar} />
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 150,
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "table-header",
      width: 150,
    },
    {
      field: "friends",
      headerName: "Friends",
      headerClassName: "table-header",
      width: 150,
    },
    {
      field: "groups",
      headerName: "Groups",
      headerClassName: "table-header",
      width: 150,
    },
  ];

  useEffect(()=>{
    setRows(dashboardData.users.map((i)=>({...i,id:i._id, avatar:transformImage(i.avatar,50)})))
  },[])
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Users"} />
    </AdminLayout>
  );
};

export default UserManagement;
