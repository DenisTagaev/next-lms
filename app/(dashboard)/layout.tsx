import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => {
  return (
    <main className="h-full w-full">
        <nav className="h-[80px] md:pl-52 fixed inset-y-0 w-full z-99">
            <Navbar/>
        </nav>
        <section className="hidden md:flex h-full w-52 flex-col fixed inset-y-0 z-99">
            <Sidebar/>
        </section>
        <section className="md:pl-52 pt-[80px] h-full">
            {children}
        </section>
    </main>
  )
}

export default DashboardLayout;