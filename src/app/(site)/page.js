import HomePage from "@/components/HomePage";
import { Metadata } from "next";


export default function Home() {
  return (
    <>
      <div className="bg-[#f6f6f8] w-full ">
        <div className=" ">
          <HomePage />
        </div>

      </div>
    </>
  );
}

export const metadata = {
  title: "Create Your Resume",
  description: "Start building your professional resume today. Choose a template and customize it to your needs.",
}; 