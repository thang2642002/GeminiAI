import { useEffect, useState } from "react";
import temp from "../assets/temp.jpeg";
import menu from "../assets/menu.png";
import SideBar from "../components/SideBar";
import iconStar from "../assets/star.png";
import { useParams } from "react-router-dom";
import Gemini from "../gemini";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setNameChat } from "../store/chatSlice";
const ChatDetails = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [dataDetails, setDataDetails] = useState([]);
  const [messageDetails, setMessageDetails] = useState([]);
  const [inputChat, setInputChat] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.chat);

  const handleChatDetails = async () => {
    if (id) {
      const chatText = await Gemini(inputChat, messageDetails);
      if (dataDetails.title === "chat") {
        const promptName = `This is a new chat, and user ask about ${inputChat}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
        const newTitle = await Gemini(promptName);
        dispatch(setNameChat({ newTitle, chatId: id }));
      }
      if (chatText) {
        const dataMessage = {
          idChat: id,
          userMess: inputChat,
          botMess: chatText,
        };
        dispatch(addMessage(dataMessage));
        setInputChat("");
      }
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const chat = data.find((chat) => chat.id === id);
      console.log(chat);
      if (chat) {
        setDataDetails(chat);
        setMessageDetails(chat.messages);
      }
    }
  }, [data, id]);

  return (
    <div className="text-white xl:w-[80%] w-full relative">
      <div className="flex items-center space-x-2 p-4">
        <button onClick={() => setMenuToggle(!menuToggle)}>
          <img src={menu} alt="icon-menu" className="w-8 h-8 xl:hidden " />
        </button>
        <h1 className="uppercase text-xl font-bold">Gemini</h1>
      </div>
      {menuToggle && (
        <div className="absolute w-auto h-full top-0 left-0 xl:hidden">
          <SideBar onToggle={() => setMenuToggle(!menuToggle)} />
        </div>
      )}
      <div className="max-w-[90%] w-full mx-auto mt-20 space-y-20">
        {id ? (
          <div className="flex flex-col space-y-4 p-4 h-[400px]  overflow-x-hidden overflow-y-auto">
            {Array.isArray(messageDetails) &&
              messageDetails.map((item) => (
                <div className="flex flex-col space-y-6" key={item.id}>
                  <div className="flex space-x-6 items-baseline">
                    {item.isBot ? (
                      <>
                        <img
                          src={iconStar}
                          alt="icon-star"
                          className="w-4 h-4"
                        />
                        <p dangerouslySetInnerHTML={{ __html: item.text }} />
                      </>
                    ) : (
                      <>
                        <p>User:</p>
                        <p>{item.text}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-5">
              <div className="space-y-1">
                <h2
                  className="bg-gradient-to-r from-blue-600 via-green-500 
          to-indigo-400 text-[30px] font-bold inline-block text-transparent bg-clip-text"
                >
                  Xin Chào
                </h2>
                <p className="text-3xl">Hôm nay tôi có thể giúp gì cho bạn</p>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-[200px] h-[200px] bg-primaryBg-sideBar
            flex items-center justify-center rounded-lg"
                >
                  <p>Lên kế hoạch bữa ăn</p>
                </div>
                <div
                  className="w-[200px] h-[200px] bg-primaryBg-sideBar
            flex items-center justify-center rounded-lg"
                >
                  <p>Cụm từ ngôn ngữ mới</p>
                </div>
                <div
                  className="w-[200px] h-[200px] bg-primaryBg-sideBar
            flex items-center justify-center rounded-lg"
                >
                  <p>Bí quyết viết thư xin việc</p>
                </div>
                <div
                  className="w-[200px] h-[200px] bg-primaryBg-sideBar
            flex flex-col items-center justify-center rounded-lg gap-2"
                >
                  <p>Tạo hình ảnh AI</p>
                  <img
                    src={temp}
                    alt="img-temp"
                    className="w-[150px] h-[150px]"
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex items-center space-x-4 w-full">
          <input
            type="text"
            value={inputChat}
            placeholder="Nhập câu lệnh tại đây"
            onChange={(e) => setInputChat(e.target.value)}
            className="w-[90%] p-3 rounded-lg bg-primaryBg-default border "
          />
          <button
            className="p-3 rounded-lg bg-green-500 text-white"
            onClick={handleChatDetails}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
