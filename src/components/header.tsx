import movieExplorerLogo from "../assets/movieExplorer.png";
export default function Header() {
  return (
    <header className="flex justify-around items-center text-white p-2">
      <div>
        <img src={movieExplorerLogo} alt="Logo" className="h-10" />
      </div>

      <nav className="">
        <input type="text" placeholder="Search..." className="border rounded py-2 px-3 text-center w-[20rem]" />
      </nav>

      <div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded ml-2">Sign Up</button>
      </div>
      
    </header>
  );
}