"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetResume } from "@/redux/slices/resumeSlice";
import Review from "./Review";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetResume());
  }, [dispatch]);

  return (
    <>
      <section className="container px-4 md:mx-auto  py-20  md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                <span className=" text-[14px] ">
                  <svg
                    className="w-3 h-3 text-blue-800  "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.05 4.05A7 7 0 0 1 19 9c0 2.407-1.197 3.874-2.186 5.084l-.04.048C15.77 15.362 15 16.34 15 18a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1c0-1.612-.77-2.613-1.78-3.875l-.045-.056C6.193 12.842 5 11.352 5 9a7 7 0 0 1 2.05-4.95ZM9 21a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Zm1.586-13.414A2 2 0 0 1 12 7a1 1 0 1 0 0-2 4 4 0 0 0-4 4 1 1 0 0 0 2 0 2 2 0 0 1 .586-1.414Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>{" "}
                <span className="text-blue-800">
                  New: Expert-Designed Templates
                </span>
              </div>
              <h1 className="text-5xl md:text-[68px] font-black leading-[1.1] tracking-tight text-[#0d0d1b] ">
                Build Your Professional <br /> Resume{" "}
                <span className="text-[#1617e8] italic">for Free</span>
              </h1>
              <p className="text-xl md:text-xl text-slate-600  leading-relaxed max-w-[540px]">
                Land your dream job with our ATS-friendly templates and
                expert-guided builder. Create a professional resume in minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/templates"
                className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-primary/30 bg-[#1617e8] hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <span>Start Building Now</span>
                <svg
                  className="w-6 h-6 text-white "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </Link>
              <Link
                href="/templates"
                className="px-8 py-4 bg-white  border border-[#e7e7f3]  text-[#0d0d1b]  text-lg font-bold rounded-xl hover:bg-gray-600 hover:text-white  transition-all"
              >
                View Templates
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-2">
                <div
                  className="size-8 rounded-full border-2 border-white bg-slate-300 bg-cover"
                  data-alt="Avatar of successful job seeker"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZTwOABewAs06Kqv4yeOfOoCF-eIwQWuZiXdF1x10UBNMioz-0hFM84b7ce8XZUKnTTuCLw3KeHmlpPGqsKWLx4OqteRpm8QKGALF8d1Jh-gTOEQOlSnXTxg1JqkG7eUEgLlN7lnSaMOy-KOEN3HjdaRmOIKT-XHaM5RoPf8MKp9gh_i1rdsbFRkZ8vJ7VvkgBTUDc5zhjBQuxjO_i-J65jgK4igyDs0HBgxBP91fpWT-ZsXaYJQCxrvDkTnn43q75J1LA6VkewRY')",
                  }}
                ></div>
                <div
                  className="size-8 rounded-full border-2 border-white bg-slate-400 bg-cover"
                  data-alt="Avatar of professional user"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRH_68YlYSxZWNd5XC0FJ56bXPtAv5gdEjSd4VVCovNYKBCUrdnWRloUY5WQyGzvoOw0zkXk3b9GjAm7AY2TEXcUXTZWNS59PCWJ-ilcFyVRNf91si964alP1qd5rjQCkxCEyHF1M6Z9nnz0oThYsxSCvfI8krcLvL0M9USgvXPHs_MJngC6-K18lbh3wPUkJ5VQuQbVEqrAzXBMUwUTR642fxLA4x-UAqz2HocIPYWbR5KdjTHW1rWodtxTJZKepN05uC7zVGW60')",
                  }}
                ></div>
                <div
                  className="size-8 rounded-full border-2 border-white bg-slate-500 bg-cover"
                  data-alt="Avatar of hired candidate"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFLZHchQ7uydkOj8j8pn6zEEn9xHUEvpt9qZxs8pMIXX4PApno2eapgiXT38ZvxyAaTjfo-Txc1Fd6ne1Wynu4kl-6_et8kc9W0HZ3rNXF919PC7LZuPkJjOtHU-igKv3xEvSklGnl6-CkJG6CpRVBXrG55tZeJp2EcPScJsGgQmXAa9uVIqQTuN16XHe5PC53koFW_zgqxRHV_Tcb9vkg_oNWi7hC8pshbscy0q53tFB3s4FmOmfTqR4NrbJQElp_btvhNnuDm-c')",
                  }}
                ></div>
              </div>
              <span>Trusted by job seekers worldwide</span>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[3/4]   rounded-4xl bg-white shadow-2xl overflow-hidden border border-slate-100 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    data-alt="Professional modern resume template mockup"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCP3T2ZpqijNKrROI-kAjYv3qiF7vZY5KUbLtnzck3dqpzGjwvdwOiSFpNVGcyillDb2473YJF5am2T9KjPEIGVcAhlK-qDFQnnGhk9OKtKo5YqSQpeqBjwRt9jfL-uxFhvJGq9kolEqXbD8I25LzI-aVNPDUnYhydbZ_8Tngm_0gnMZRBblMrJkSnfOhvVd9UuKxBPtkpZ0zqUez9B1EZFtuR3DDKJ62zSFTs3U5Xr_uTRwP8mAjcPr1K1dQeiEhOdpOPhO27kcls')",
                    }}
                  ></div>
                </div>
                <div className="aspect-[3/4] rounded-4xl bg-white shadow-2xl overflow-hidden border border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    data-alt="Creative design resume template mockup"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAA9k4TlybGuWMs27TvqJuljBgPK05t0d_Q1JNnhlJVg9gxQom1P9HyDvozr7tW9IEyoC2oYZJUaRgRB8V8R2X-HThzaomZMfWijCRHDSrWQcRSV6qII80-uGrotAuG5yFFkGq5qrJ4nAIN3-uNVSIcm99n4gWAfY2Vtm0A-RdPaN48N5qsah3pdw604jpKFOyjIU8jHNtrczJyFSCVCa-4NVm1qlzmmSZugGomoMvuhdC8eODiNzs4_jDwMi5W92Hrqj5yz6Js1c')",
                    }}
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-4xl bg-white shadow-2xl overflow-hidden border border-slate-100 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    data-alt="Corporate Executive resume template mockup"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTjWBHmgRSoGPXVaoee8gblO_jZ9yEjFEB2b1tA9AQannKJQk8jFpRJlpZrehuOaU2dmyPtP5wsykp4_rzg_JuXy99lMQSp64ZJ0ezGac2aPcswTbMSQAusaRyyx7Hp7rRgizPUkaYtvxnDe1eg0mNz0gpJ3EBarkI_db85lP1vZWeL1VbXYTdu69e1kPlpvOG5UXBULD0hgMSNx_YWahyMYWhgdmbn0eeyvgK7fDgcSPC3bxmWSGpsV8ricw8R1DeFturE3TK40E')",
                    }}
                  ></div>
                </div>
                <div className="aspect-[3/4] rounded-4xl bg-white shadow-2xl overflow-hidden border border-slate-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    data-alt="Minimalist clean resume template mockup"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOIYluAmDyBLP9oSGWCdwrGpYPzNdmQDZ0E9z_qBevnlRKHYOZ8mvD7uUB6P56vg4JGoEHYjbTZSGlvlB_Q6cu3TxkLS94RxPAV82Ie56QgpL_mILvuldVWvg8-qZ4tOB93F6w5_-1pv4fOyI57XzpK51cg2en1nP2E6X_Lwo0PQTM9kec4o5lH6n63ucfcQz3qnBLzFVcPVO5PbrdYiyqj9AqnoTxxYEWtp_jgfSHfo7jn7Co9WFjAPYY78g8I5tBfaSbkQnmLWE')",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Features Section --> */}
      <section className=" container px-4 md:mx-auto  py-20">
        <div className="flex flex-col gap-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-[#0d0d1b] ">
              Everything you need to get hired
            </h2>
            <p className="text-slate-600  text-lg max-w-[720px] mx-auto">
              Our tools are designed by career experts to give you an unfair
              advantage in your job search.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-5 rounded-2xl border border-[#cfcfe7]  bg-white  p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <div className="size-12  bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary bg-[#1617e8]/10  group-hover:bg-[#1617e8] rounded-full p-2     ">
                <svg
                  className="w-24 h-24 text-[#1617e8] group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold leading-tight">
                  ATS-Optimized Templates
                </h3>
                <p className="text-[#64748b]  leading-relaxed text-[18px]">
                  Templates tested against top Applicant Tracking Systems to
                  ensure your resume passes the bot screening and reaches human
                  eyes.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-[#cfcfe7]  bg-white  p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <div className="size-12  bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary bg-blue-100  group-hover:bg-[#1617e8] rounded-full p-2     ">
                <svg
                  className="w-24 h-24 text-[#1617e8] group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold leading-tight">
                  Expert Content Tips
                </h3>
                <p className="text-[#64748b]  leading-relaxed text-[18px]">
                  Smart content suggestions help you describe your experience
                  effectively using industry-standard formats.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-[#cfcfe7]  bg-white  p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <div className="size-12  bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary bg-blue-100  group-hover:bg-[#1617e8] rounded-full p-2     ">
                <svg
                  className="w-24 h-24 text-[#1617e8] group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold leading-tight">
                  Instant PDF Download
                </h3>
                <p className="text-[#64748b]  leading-relaxed text-[18px]">
                  No hidden fees. Download your polished, high-resolution resume
                  in seconds and start applying to your dream roles immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Testimonials Section --> */}
      <Review />

      {/* <!-- CTA Banner --> */}
      <section className=" container px-4 md:mx-auto  py-10">
        <div className="w-full bg-[#1617e8] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden flex flex-col items-center text-center gap-8">
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Ready to land your dream job?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-[600px] mx-auto">
              Start your professional journey today with our easy-to-use resume
              builder.
            </p>
          </div>
          <Link
            href="/templates"
            className="relative z-10 px-10 py-5 bg-white text-[#1617e8] text-primary text-xl font-black rounded-2xl hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Create My Resume Now
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
