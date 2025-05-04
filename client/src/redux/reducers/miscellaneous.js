import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isMobile: false,
  isSearch: false,
  isNotification: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  seletedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const miscellaneousSlice = createSlice({
  name: "miscellaneous",
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.seletedDeleteChat = action.payload;
    },
  },
});

export default miscellaneousSlice;
export const {
  setIsAddMember,
  setIsDeleteMenu,
  setIsFileMenu,
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
  setSelectedDeleteChat,
  setUploadingLoader,
} = miscellaneousSlice.actions;
