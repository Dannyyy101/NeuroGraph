"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <>
      <button className="absolute top-6 right-6" onClick={() => setOpen(true)}>
        <span className="material-symbols-outlined icon-size-40">menu</span>
      </button>
      {visible && (
        <nav
          className={`h-screen w-48 absolute top-0 right-0 bg-background-100 transition-all duration-300 ${
            open ? "slide-left" : "slide-right"
          }`}
        >
          <button
            className="absolute top-6 left-6"
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined icon-size-40">menu</span>
          </button>
        </nav>
      )}
    </>
  );
}
