import PropTypes from "prop-types";
import plusIcon from "../assets/plusIcon.png";
import chatimg from "../assets/chat.png";
import remove from "../assets/remove.png";
import menu from "../assets/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { addChat, removeChat } from "../store/chatSlice";
import { Link, useNavigate } from "react-router-dom";

function SideBar({ onToggle }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.chat);
  const navigate = useNavigate();

  const handleNewChat = () => {
    dispatch(addChat());
  };
  const handleRemoveChat = (id) => {
    dispatch(removeChat(id));
    navigate("/");
  };
  return (
    <div className="bg-primaryBg-sideBar w-[280px] h-screen p-8">
      <button className="flex ml-auto xl:hidden" onClick={onToggle}>
        <img src={menu} alt="icon-menu" className="w-10 h-10" />
      </button>
      <div className="mt-20">
        <button
          className="px-4 py-2 flex items-center space-x-4 bg-gray-600 mb-10"
          onClick={handleNewChat}
        >
          <img src={plusIcon} alt="icon" className="w-4 h-4" />
          <p className="text-white">Cuộc trò chuyện mới</p>
        </button>
        <div className="space-y-4">
          <p className="text-white">Gần đây:</p>
        </div>
        <div className="flex flex-col space-y-6 mt-4 cursor-pointer">
          {data.map((chat) => (
            <Link
              to={`/chat/${chat.id}`}
              className="flex items-center justify-between p-2 bg-gray-800"
              key={chat?.id}
            >
              <div className="flex items-center gap-4">
                <img src={chatimg} alt="img-chat" className="w-8 h-8" />
                <p className="text-white">{chat.title}</p>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveChat(chat.id);
                  }}
                >
                  <img src={remove} alt="remove" className="w-5 h-5" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  onToggle: PropTypes.func,
};

export default SideBar;
