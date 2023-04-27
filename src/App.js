import Hero from "./Component/Navbar/Hero";
import Navbar from "./Component/Navbar/Navbar";
import Input from "./Component/Navbar/Input";

function App() {
  return (
    <div className="w-full background-animate  bg-gradient-to-b min-h-screen from-slate-200 via-purple-200 to-orange-200">
      <Navbar />
      <Hero />
      <Input />
    </div>
  );
}

export default App;
