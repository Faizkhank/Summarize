const Navbar = () => {
  return (
    <div className="h-[45px] w-full">
      <div className="flex w-full justify-between">
        <div className="p-2 ml-10">
          <h1 class="text-4xl font-bold text-gray-900">
            Sum<span class="text-indigo-500 ">marize</span>
          </h1>
        </div>
        <div className="p-5 mr-10">
          <a
            href="https://github.com/Faizkhank"
            className="bg-black text-white px-4 py-2 rounded-3xl cursor-pointer relative z-50 "
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
