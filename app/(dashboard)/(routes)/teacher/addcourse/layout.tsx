import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Course",
  description: "Course creation form page",
};

const AddCourseLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  return (
    <div
        className="max-w-5xl min-w-[476px] lg:mx-auto flex lg:items-center 
        md:justify-center h-full p-6"
      >
        {children}
      </div>
  );
};

export default AddCourseLayout;
