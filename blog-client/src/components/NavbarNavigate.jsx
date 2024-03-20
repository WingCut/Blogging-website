import { useState, useRef, useEffect } from "react";

export let activeLineRef;
export let activeTabRef;

const NavbarNavigate = ({
  routes,
  hidden = [],
  defaultRoute = 0,
  children,
}) => {
  activeLineRef = useRef();
  activeTabRef = useRef();
  const [activeNav, setActiveNav] = useState(defaultRoute);
  const handleActiveNav = (btn, i) => {
    const { offsetWidth, offsetLeft } = btn;
    activeLineRef.current.style.width = offsetWidth + "px";
    activeLineRef.current.style.left = offsetLeft + "px";
    setActiveNav(i);
  };

  useEffect(() => {
    handleActiveNav(activeTabRef.current, defaultRoute);
  }, []);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-[#F3F3F3] flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i === defaultRoute ? activeTabRef : null}
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (activeNav == i ? " text-black " : " text-[#6b6b6b] ") +
                (hidden.includes(route) ? "md:hidden " : " ")
              }
              onClick={(e) => {
                handleActiveNav(e.target, i);
              }}
            >
              {route}
            </button>
          );
        })}
        <hr
          ref={activeLineRef}
          className="absolute bottom-0 border-black duration-300 "
        />
      </div>
      {Array.isArray(children) ? children[activeNav] : children}
    </>
  );
};
export default NavbarNavigate;
