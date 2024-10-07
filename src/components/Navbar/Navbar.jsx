import { Menu, Mic, MoonStar, Search, Sun } from "lucide-react";
import Logo from "../assets/ytlogo.png";
import user from "../assets/user.png";

import { useEffect, useState } from "react";

const Navbar = ({ toggleSidebar, onSubmit, setSearchTerm, searchTerm }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    document.body.classList[isDarkMode ? "add" : "remove"]("dark");
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-neutral-900">
      <nav className="flex items-center justify-between py-2 pb-5 px-4">
        <HeaderLeftSection toggleSidebar={toggleSidebar} />

        <div className="h-10 flex gap-3 w-[600px] max-lg:w-[500px] max-md:hidden">
          <form action="#" className="flex w-full">
            <input
              className="border border-neutral-300 w-full h-full rounded-l-full px-4 outline-none focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-500 dark:focus:border-blue-500 dark:text-neutral-300"
              type="text"
              values={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              required
            />
            <button
              onClick={onSubmit}
              className="border border-neutral-300 px-5 border-l-0 rounded-r-full hover:bg-neutral-100 dark:border-neutral-500 hover:dark:bg-neutral-700"
            >
              <Search className="dark:text-neutral-400" />
            </button>
          </form>
          <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700">
            <Mic className="dark:text-neutral-400" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full md:hidden hover:bg-neutral-200 hover:dark:bg-neutral-700">
            <Search className="dark:text-neutral-400" />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
          >
            {isDarkMode ? (
              <Sun className="dark:text-neutral-400" />
            ) : (
              <MoonStar className="dark:text-neutral-400" />
            )}
          </button>
          <img
            className="w-8 h-8 rounded-full cursor-pointer"
            src={user}
            alt="User Image"
          />
        </div>
      </nav>
    </header>
  );
};

export const HeaderLeftSection = ({ toggleSidebar }) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
      >
        <Menu className="dark:text-neutral-400" />
      </button>
      <a className="flex items-center gap-2" href="#">
        <img src={Logo} width={32} alt="Logo" />
        <h2 className="text-xl font-bold dark:text-neutral-300">YouTube</h2>
      </a>
    </div>
  );
};

export default Navbar;
