import NavbarNavigate from "../components/NavbarNavigate";

const HomePage = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex justify-center gap-10">
      {/* blog mới nhất*/}
      <div className="w-full">
        <NavbarNavigate
          routes={["trang chủ", "xu hướng"]}
          hidden={["xu hướng"]}
        >
          <h1>Blog mới nhất</h1>

          <h1>Blog Xu hướng</h1>
        </NavbarNavigate>
      </div>
      {/* trending blog */}
      <div></div>
    </section>
  );
};
export default HomePage;
