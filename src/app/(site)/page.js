"use client";
import HomePage from "@/components/HomePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetResume } from "@/redux/slices/resumeSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetResume());
  }, [dispatch]);

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
