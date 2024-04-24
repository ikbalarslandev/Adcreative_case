import { FaGithub } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className=" flex justify-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-200 to-yellow-600  h-[7vh]">
      <a
        href="https://github.com/ikbalarslandev/Adcreative_case"
        target="_blank"
        className="flex   items-center gap-3 transition duration-150 ease-in-out active:scale-95"
      >
        <span className="font-bold">Made by ikbal arslan</span>

        <FaGithub className="text-2xl" />
      </a>
    </footer>
  );
};

export default FooterComponent;
