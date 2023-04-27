import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../Services/DataSlice";
import load from "../Assets/load.png";
import "./style.css";

const Input = () => {
  const [param, setparam] = useState("");
  const [Allarticle, setallarticle] = useState([]);
  const [article, setarticle] = useState(null);
  const [notification, setnotification] = useState(false);
  const { data, Status } = useSelector((state) => state.summary);

  const handleCopyClick = (Url) => {
    navigator.clipboard
      .writeText(Url)
      .then(() => {
        setnotification("Copied !!");
        setTimeout(() => {
          setnotification(false);
        }, 1000);
      })
      .catch((error) => {
        setnotification("Error copying text: ", error);
      });
  };
  const Handleparam = async () => {
    const boolen = Allarticle.some((items) => items.Url === param);

    if (boolen) {
      setnotification("Already exist");
      setTimeout(() => {
        setnotification(false);
      }, 1000);
    } else {
      dispatch(fetch(param));
    }
  };
  const getArticle = (index) => {
    setarticle(Allarticle[index]);
  };
  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem("userAritcle"));
    if (datas) setallarticle(datas);
    if (data?.summary) {
      setarticle(data);
      const boolen = Allarticle.some((items) => items.Url === param);
      if (!boolen) {
        if (Allarticle.length > 4) {
          Allarticle.pop(Allarticle.length - 1);
        }
        const Allarticles = [
          { summary: data.summary, Url: param },
          ...Allarticle,
        ];
        setallarticle(Allarticles);
        localStorage.setItem("userAritcle", JSON.stringify(Allarticles));
      }
    }
  }, [data]);

  const dispatch = useDispatch();
  return (
    <div>
      <div className="top-0 right-0  fixed m-auto w-full">
        <div className="flex justify-center">
          <div
            className={`p-10 pl-15 text-white font-semibold text-2xl rounded-xl w-[300px] z-30  ease-in-out duration-300 ${
              notification ? " translate-y-3 bg-black " : "translate-y-0"
            }`}
          >
            {notification}
          </div>
        </div>
      </div>
      <div className="mt-[30px]">
        <div className="flex justify-center">
          <div className="lg:w-[43%] xs:w-[83%]">
            {Allarticle.map((items, index) => {
              return (
                <div
                  key={index}
                  className="h-[50px] hover:scale-105 duration-150 translate-y-1 flex bg-white cursor-pointer rounded-xl shadow-xl font-semibold p-3 m-2 item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mt-[2px] mr-3"
                    onClick={() => handleCopyClick(items.Url)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>

                  <p
                    className="text-black overflow-hidden"
                    onClick={() => {
                      getArticle(index);
                    }}
                  >
                    {items.Url}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center mt-[30px]">
          <input
            type="text"
            required
            placeholder="Place your article link here"
            className=" lg:w-[40%] xs:w-[70%] w-[40%] rounded-l-xl font-normal p-2 border-white focus:outline-none"
            onChange={(e) => {
              setparam(e.target.value);
            }}
          />
          <button
            className=" bg-white p-3 group rounded-r-xl hover:bg-black duration-200 font-semibold"
            onClick={(e) => {
              Handleparam();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 group-hover:scale-110 duration-200 group-hover:stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      {Status === "loading" ? (
        <div className="flex justify-center mt-7">
          <img
            src={load}
            alt="loading"
            className=" w-[80px] h-[80] animate-spin"
          />
        </div>
      ) : null}
      {article?.summary ? (
        <div className="h-auto flex justify-center mt-10">
          <div className="lg:w-[43%] xs:w-[80%] rounded-xl  shadow-lg bg-white">
            <p className="p-7 desc1 cursor-pointer">
              Summarize
              <span className="text-2xl text-black cursor-pointer">Text</span>
            </p>
            <p className="p-7">{article.summary}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Input;
