/**
 * Home component that renders the main page of the application.
 * @returns {JSX.Element} The Home component.
 */
import ChatBox from "@/components/ChatBox";
import Icon from "@/components/Icon";
import LandingPage from "@/components/LandingPage";
import LeftNav from "@/components/LeftNav";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import UsersPopup from "@/components/popup/UsersPopup";
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { useScreenSize } from "@/context/screenSizeContext";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Home = () => {
  const [userPopup, setUserPopup] = useState(false);
  const { currentUser, isLoading } = useAuth();
  const { data } = useChatContext();
  const { isSmallScreen, setOpenLeftNav, setOpenSearch } = useScreenSize();

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return (
      <>
        <LandingPage />
      </>
    );
  }


  return (
    <>
      {isSmallScreen && (<>
        {userPopup && <UsersPopup onHide={() => setUserPopup(false)} />}

      </>)}
      <div className="bg-c1 flex ">
        <div className="flex w-full shrink-0 overflow-hidden relative">
          {!isSmallScreen && <LeftNav />}
          <div className="flex bg-c2 w-full ">
            <div
              className={`${isSmallScreen ? "w-full" : "md:w-7/12 xl:w-3/12"}`}
            >
              <Sidebar />
              {isSmallScreen && <Icon
                size="x-large"
                className={`bg-green-500 hover:bg-green-600 absolute top-[86%] right-6 z-40`}
                icon={<FiPlus size={24} />}
                onClick={() => {
                  setUserPopup(!userPopup);
                  setOpenSearch(false);
                  setOpenLeftNav(false);
                }}
              />}
            </div>
            <ChatBox data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
