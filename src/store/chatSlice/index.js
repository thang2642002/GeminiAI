import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { marked } from "marked";
import DOMPurify from "dompurify";

const initData = {
  data: [],
};

/*
  data: [
   {
    id: 1,
    title: tên title,
    message: [
    {
    id: 1,
    text: "React là gì",
    isBot: fasle    
    },
    {
    id: 1,
    text: "React là gì .... của js",
    isBot: true    
    },
    ]
   }
  
  ]
 
 */

const chatSlice = createSlice({
  name: "chat",
  initialState: initData,
  reducers: {
    addChat: (state) => {
      state.data.push({
        id: uuidv4(),
        title: "chat",
        messages: [],
      });
    },
    addMessage: (state, action) => {
      const { idChat, userMess, botMess } = action.payload;
      const chat = state.data.find((chat) => chat.id === idChat);

      if (chat) {
        const messageFormat = marked.parse(botMess);
        const safeChat = DOMPurify.sanitize(messageFormat);
        const newMessage = [
          ...chat.messages,
          { id: uuidv4(), text: userMess, isBot: false },
          { id: uuidv4(), text: safeChat, isBot: true },
        ];

        chat.messages = newMessage;
      }
    },
    removeChat: (state, action) => {
      state.data = state.data.filter((chat) => chat.id !== action.payload);
    },
    setNameChat: (state, action) => {
      const { newTitle, chatId } = action.payload;
      const chat = state.data.find((chat) => chat.id === chatId);
      if (chat) {
        chat.title = newTitle;
      }
    },
  },
});

export const { addChat, removeChat, addMessage, setNameChat } =
  chatSlice.actions;

export default chatSlice.reducer;
