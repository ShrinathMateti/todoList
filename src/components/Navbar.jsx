import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-center bg-sky-700 text-white py-3">
      <div className="logo">
        <span className="font-bold mx-9 hover:font-thin cursor-pointer transition-all">
          MyTodoList
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
