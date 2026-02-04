import HomePage from "@/components/HomePage";

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

// Title: 52 chars, Description: 158 chars
export const metadata = {
  title: "Free Resume Builder - Create Professional CVs",
  description: "Create professional resumes for free with Cvee. Choose from ATS-friendly templates, customize instantly, and download as PDF. No sign-up required.",
  alternates: {
    canonical: "/",
  },
};
