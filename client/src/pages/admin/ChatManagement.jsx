import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../constants/dummyChats";
import { transformImage } from "../../lib/feature";
import AvatarCard from "../../components/shared/AvatarCard";

const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 100,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "table-header",
      width: 110,
      renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 150,
    },
    {
      field: "totalMembers",
      headerName: "Total Members",
      headerClassName: "table-header",
      width: 120,
    },
    {
      field: "members",
      headerName: "Members",
      headerClassName: "table-header",
      width: 200,
      renderCell: (params) => (
        <AvatarCard max={100} avatar={params.row.members} />
      ),
    },
    {
      field: "totalMessages",
      headerName: "Total Messages",
      headerClassName: "table-header",
      width: 120,
    },
    {
      field: "creator",
      headerName: "Created By",
      headerClassName: "table-header",
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={"1rem"} alignItems={"center"}>
          <Avatar
            alt={params.row.creator.name}
            src={params.row.creator.avatar}
          />
          <span>{params.row.creator.name} </span>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    setRows(
      dashboardData.chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
        members:i.members.map((i)=>transformImage(i.avatar,50)),
        creator:{
          name:i.creator.name,
          avatar:transformImage(i.creator.avatar,50),
        }
      }))
    );
    // console.log(dashboardData.chats)
  }, []);
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Chats"} />
    </AdminLayout>
  );
};

export default ChatManagement;
