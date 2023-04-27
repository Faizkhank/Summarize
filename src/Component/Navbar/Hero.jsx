import { React, useState } from "react";
import "./style.css";
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <header
      onLoad={() => {
        setIsLoaded(true);
      }}
    >
      <div className="mt-[50px]">
        <div className="flex justify-center">
          <div className="lg:w-[28vw]  xs:w-[57vw] md:w-[67vw] text-center">
            <p className="font-bold lg:text-8xl md:text-8xl sm:text-5xl xs:text-5xl">
              Summarize Articles with
            </p>
          </div>
        </div>
        <div className=" flex justify-center">
          <p className=" font-bold orange_gradient lg:text-8xl md:text-8xl sm:text-5xl xs:text-5xl">
            OpenAI GPT-4
          </p>
        </div>
        <div className="desc flex justify-center px-[40px]">
          <p>
            Simplify your reading with Summize, an open-source article
            summarizer that transforms lengthy articles into clear and concise
            summaries
          </p>
        </div>
      </div>
    </header>
  );
};
export default Hero;
