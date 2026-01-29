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
  title: "Resume Builder",
  description: "Build your resume with our easy-to-use resume builder.",
}; 