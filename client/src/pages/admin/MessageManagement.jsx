import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Box, Stack } from "@mui/material";
import { dashboardData } from "../../constants/dummyChats";
import { fileFormat, transformImage } from "../../lib/feature";
import moment from "moment";
import { matBlack } from "../../constants/color";
import RenderAttachment from "../../components/shared/RenderAttachment";

const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 140,
    },
    {
      field: "attachments",
      headerName: "Attachments",
      headerClassName: "table-header",
      width: 150,
      renderCell: (params) => {
        const { attachments } = params.row;
        console.log(attachments);
        return attachments?.length > 0
            ? attachments.map((i) => {
              const url = i.url;
              const file = fileFormat(url)
                return <Box>
                  <a href={url} download target="_blank" style={{
                    color:matBlack
                  }}>

                    {RenderAttachment(file,url)}
                  </a>
                </Box>;
              })
            : "No Attachments"
        
      },
    },
    {
      field: "content",
      headerName: "Content",
      headerClassName: "table-header",
      width: 150,
    },
    {
      field: "sentBy",
      headerName: "Sender",
      headerClassName: "table-header",
      width: 150,
      renderCell: (params) => (
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
          <span>{params.row.sender.name} </span>
        </Stack>
      ),
    },
    {
      field: "chat",
      headerName: "Chat",
      headerClassName: "table-header",
      width: 150,
    },
    {
      field: "groupChat",
      headerName: "Group Chat",
      headerClassName: "table-header",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Time",
      headerClassName: "table-header",
      width: 200,
    },
  ];

  useEffect(() => {
    setRows(
      dashboardData.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY,h:mm:ss a"),
      }))
    );
    console.log(dashboardData.messages);
  }, []);
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Messages"} rowHeight={180}/>
    </AdminLayout>
  );
};

export default MessageManagement;
