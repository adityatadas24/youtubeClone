import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/SideBar";
import VideoItem from "../components/VideoItem/VideoItem";
import BasicModal from "../components/Modal/Modal";
import { categories } from "../constants/Index";
import Category from "../components/Category/Category";


const API_KEY = "AIzaSyCOzdiObyNRRonxDD24O20i0TcZY-dth20";

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [datas, setDatas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");
    const [nextPageToken, setNextPageToken] = useState("");
    const [prevPageToken, setPrevPageToken] = useState("");
    const [currentPageToken, setCurrentPageToken] = useState("");

    useEffect(() => {
        async function fetching() {
            const fetchData = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet,id&order=date&maxResults=15&q=${query}&pageToken=${currentPageToken}`;

            try {
                const response = await fetch(fetchData);
                const data = await response.json();

                if (data.items) {
                    const result = data.items.map((doc) => ({ ...doc }));
                    setDatas(result);
                    setNextPageToken(data.nextPageToken || "");
                    setPrevPageToken(data.prevPageToken || "");
                } else {
                    setDatas([]);
                }
            } catch (error) {
                console.error("Error fetching YouTube data:", error);
            }
        }

        fetching();
    }, [query, currentPageToken]);

    console.log(datas);

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchTerm);
    };

    const handleNextPage = () => {
        setCurrentPageToken(nextPageToken);
    };

    const handlePrevPage = () => {
        setCurrentPageToken(prevPageToken);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (window.innerWidth >= 768) setIsSidebarOpen(true);
    }, []);

    return (
        <div className="max-h-screen flex flex-col overflow-hidden dark:bg-neutral-900">
            <Navbar
                toggleSidebar={toggleSidebar}
                onSubmit={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <BasicModal />
            <div className="flex overflow-auto">
                <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                <div
                    onClick={toggleSidebar}
                    className={`md:hidden ${!isSidebarOpen && "opacity-0 pointer-events-none"
                        } transition-all bg-black bg-opacity-50 h-screen w-full fixed left-0 top-0 z-20`}
                ></div>

                <div
                    className={`w-full px-4 overflow-x-hidden custom_scrollbar ${isSidebarOpen && "hide_thumb"
                        }`}
                >
                    <div className="sticky bg-white top-0 z-10 pb-3 flex gap-3 overflow-y-auto no_scrollbar dark:bg-neutral-900">
                        {categories.map((category) => (
                            <Category key={category} category={category} />
                        ))}
                    </div>

                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-5 pb-6">
                        {datas.map((video) => (
                            <VideoItem key={video.id.videoId} video={video} />
                        ))}
                    </div>

                    <div className="flex justify-between mt-4">
                        {prevPageToken && (
                            <button
                                onClick={handlePrevPage}
                                className="bg-black text-white px-4 py-2 rounded-md dark:bg-white dark:text-black"
                            >
                                Previous Page
                            </button>
                        )}

                        {nextPageToken && (
                            <button
                                onClick={handleNextPage}
                                className="bg-black text-white px-4 py-2 rounded-md dark:bg-white dark:text-black "
                            >
                                Next Page
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
