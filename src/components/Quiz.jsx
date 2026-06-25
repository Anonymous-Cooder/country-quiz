import { Outlet } from "react-router";

const Quiz = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-small-img bg-cover bg-center bg-no-repeat px-4 xs:bg-large-img">
        <div className="flex w-full max-w-95 flex-col gap-5 xs:max-w-md xs:gap-8 sm:max-w-lg sm:gap-9 md:max-w-xl lg:max-w-3xl xl:max-w-4xl">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Quiz;
