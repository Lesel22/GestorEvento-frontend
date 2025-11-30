import { Link, Outlet } from "react-router"

const LayoutHome = () => {
  return (
    <>
      <header className="w-full py-4 px-6 bg-[#777777]">
        <div className="">
          {/* <div className="container items-center mx-auto flex justify-between"></div> */}
          <Link to='/'>
            <h1 className="font-bold text-center font-playfair">Calenda</h1>
          </Link>
        </div>
      </header>

      <main className="flex min-h-screen items-start justify-center py-15">
        <Outlet />
      </main>

    </>
  )
}

export default LayoutHome