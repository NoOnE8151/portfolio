"use client";
import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import { projectsData } from "./projectData";
import { useForm } from "react-hook-form";
import SuccessMessage from "./components/SuccessMessage";

const Home = () => {
  //mobile warning
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    setIsWarning(true);
  }, []);

  //ghost animation
  useEffect(() => {
    // eye movement
    const move = (e) => {
      document.querySelectorAll(".pupil").forEach((pupil) => {
        const r = pupil.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const x = Math.cos(angle) * 5;
        const y = Math.sin(angle) * 5;
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);


  // custom cursor
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const addHoverEffect = (e) => {
      // Check if element should be excluded
      if (e.target.dataset.noCursor === "true") return;
      cursor.classList.add("filled", "expand");
    };

    const removeHoverEffect = (e) => {
      if (e.target.dataset.noCursor === "true") return;
      cursor.classList.remove("filled", "expand");
    };

    window.addEventListener("mousemove", moveCursor);

    const targets = document.querySelectorAll("a, p, h1, h2, h3, h4, span");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", addHoverEffect);
      el.addEventListener("mouseleave", removeHoverEffect);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverEffect);
        el.removeEventListener("mouseleave", removeHoverEffect);
      });
    };
  }, []);

  //skill logos
  const logos = [
    { src: "/assets/logo/html.png", alt: "HTML", title: "HTML" },
    { src: "/assets/logo/css.png", alt: "CSS", title: "CSS" },
    { src: "/assets/logo/js.png", alt: "JavaScript", title: "Javascript" },
    { src: "/assets/logo/react.png", alt: "React", title: "React JS" },
    {
      src: "/assets/logo/tailwindcss.png",
      alt: "Tailwind CSS",
      title: "Tailwind CSS",
    },
    { src: "/assets/logo/express.png", alt: "Express", title: "Express JS" },
    { src: "/assets/logo/mongodb.png", alt: "MongoDB", title: "Monog DB" },
    { src: "/assets/logo/nextjs.png", alt: "Next.js", title: "Next JS" },
    { src: "/assets/logo/github.png", alt: "Github", title: "Github" },
  ];

  //social handle links
  const links = [
    {
      title: "Instagram",
      url: "https://www.instagram.com/codeconquests_?igsh=MTE1cTZtZzVtMWg1ZA==",
      logo: "/assets/logo/instagram.png",
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/in/lomash-jangde-61647a295",
      logo: "/assets/logo/linkedin.png",
    },
    {
      title: "Github",
      url: "https://github.com/NoOnE8151",
      logo: "/assets/logo/github.png",
    },
  ];

  // conact form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "Inquiry Regarding Project or Collaboration",
      message:
        "Hello, I am interested in connecting regarding a potential project or collaboration.",
    },
  });

  //this state is to prevent multiclicks on send button
  const [isSending, setIsSending] = useState(false);

  //this will manage success interface
  const [showSuccess, setShowSuccess] = useState(false);

  const contactSubmit = async (data) => {
    setIsSending(true);
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const r = await res.json();
    console.log(r);

    setIsSending(false);
    setShowSuccess(true);
    reset();
  };

  return (
    <div className="h-screen">
      <header className="flex justify-end w-full items-center h-[10%] fixed top-0 z-50">
        <nav className="flex gap-5 justify-between items-center text-lg md:text-xl  h-full md:px-10 px-5 relative rounded-bl-3xl z-60">
          <Link className="pointer-cursor" href={"#hero"}>
            Home
          </Link>
          <Link className="pointer-cursor" href={"#about"}>
            About
          </Link>
          <Link className="pointer-cursor" href={"#projects"}>
            Projects
          </Link>
          <Link className="pointer-cursor" href={"#contact"}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="h-[90%] w-screen">
        <section id="hero" className="h-full w-full flex flex-col md:flex-row justify-center md:justify-start items-center px-5">
          <div className="w-[70%] h-full md:pl-28 py-10 flex items-center z-50">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl md:text-8xl font-bold font-ubuntu">Lomash&nbsp;Jangde</h1>
              <p className="md:text-3xl text-xl font-semibold">
                A Fullstack Web Developer
              </p>
              <a
                data-no-cursor="true"
                href="#contact"
                className="text-2xl underline hover:bg-white hover:text-black hover:px-5 hover:py-2 hover:rounded-lg transition-all duration-700 w-fit"
              >
                Connect
              </a>
            </div>
          </div>

          <div className="w-[30%] h-full hidden md:flex justify-center items-center z-10">
            <div className="ghost">
              <div className="body"></div>
              <div className="arm left"></div>
              <div className="arm right"></div>
              <div className="eyes">
                <div className="eye">
                  <div className="pupil"></div>
                </div>
                <div className="eye">
                  <div className="pupil"></div>
                </div>
              </div>
              <div className="mouth"></div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="py-10 md:h-full w-full flex flex-col justify-center items-center px-5 md:px-28 md:gap-16 gap-5"
        >
          <h2 className="md:text-6xl text-4xl font-semibold">About me</h2>
          <p className="md:text-5xl text-2xl text-justify md:leading-16">
            I am a Full-Stack MERN Developer focused on building clean,
            reliable, and efficient web applications. I follow a disciplined
            approach to development and value clarity, structure, and long-term
            maintainability in every project. My work reflects consistency,
            responsibility, and a commitment to continuous improvement.
          </p>
        </section>

        <section
          id="projects"
          className="py-10 w-full flex flex-col justify-center items-center md:px-28 md:gap-16 gap-10"
        >
          <h2 className="md:text-6xl text-4xl font-semibold">Projects</h2>

          <div className="flex flex-col gap-20">
            {projectsData.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="py-10 w-full flex flex-col justify-center items-center md:px-28 gap-16 overflow-hidden"
        >
          <h2 className="text-4xl md:text-6xl font-semibold">Skills</h2>
          <div className="grid md:grid-cols-6 grid-cols-4 w-full md:gap-20 gap-5">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 md:gap-5 float transition-transform duration-500 hover:scale-125"
              >
                <div className="md:w-32 md:h-32 h-20 w-20 flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h5 className="text-white font-semibold">{logo.title}</h5>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 id="contact" className="md:text-6xl text-4xl font-semibold text-center md:py-10 py-5">
            Get in Touch
          </h2>

          <div className="w-full flex flex-col md:flex-row items-center relative">
            <form
              onSubmit={handleSubmit(contactSubmit)}
              className="w-full flex flex-col gap-5 mx-16 items-center"
            >
              <div className="md:w-[50%] w-full border-2 border-gray-300 rounded-xl p-10 flex flex-col gap-5">
                <h2 className="text-4xl font-semibold mb-5">Contact Me</h2>
                <div className="flex gap-3 flex-col">
                  <label className="text-2xl">Name</label>
                  <input
                    disabled={isSending}
                    type="text"
                    placeholder="Your Name"
                    className={`border-2 border-gray-300 px-5 py-2 rounded-lg capitalize ${
                      isSending ? "cursor-not-allowed" : "cursor-text"
                    }`}
                    {...register("name", {
                      required: {
                        value: true,
                        message: "please enter your name",
                      },
                      minLength: {
                        value: 3,
                        message: "minimum name lenght is 3 letters",
                      },
                      maxLength: {
                        value: 50,
                        message: "maximum name length is 50 letters",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>

                <div className="flex gap-3 flex-col">
                  <label className="text-2xl">Email</label>
                  <input
                    disabled={isSending}
                    type="email"
                    placeholder="Your Email"
                    className={`border-2 border-gray-300 px-5 py-2 rounded-lg ${
                      isSending ? "cursor-not-allowed" : "cursor-text"
                    }`}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "please enter your email",
                      },
                      minLength: {
                        value: 3,
                        message: "minimum email lenght is 3 letters",
                      },
                      maxLength: {
                        value: 50,
                        message: "maximum email length is 50 letters",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="text-red-500">{errors.email.message}</div>
                  )}
                </div>

                <div className="flex gap-3 flex-col">
                  <label className="text-2xl">Phone</label>
                  <input
                    disabled={isSending}
                    type="text"
                    placeholder="1987654321"
                    className={`border-2 border-gray-300 px-5 py-2 rounded-lg ${
                      isSending ? "cursor-not-allowed" : "cursor-text"
                    }`}
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "please enter your contact number",
                      },
                      minLength: {
                        value: 10,
                        message: "minimum lenght is 10 digit",
                      },
                      maxLength: {
                        value: 10,
                        message: "maximum length is 10 letters",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="text-red-500">{errors.phone.message}</div>
                  )}
                </div>

                <div className="flex gap-3 flex-col">
                  <label className="text-2xl">Subject</label>
                  <input
                    disabled={isSending}
                    type="text"
                    placeholder="e.g Inquery Regarding Collabration"
                    className={`border-2 border-gray-300 px-5 py-2 rounded-lg ${
                      isSending ? "cursor-not-allowed" : "cursor-text"
                    }`}
                    {...register("subject", {
                      required: {
                        value: true,
                        message: "please write a subject",
                      },
                      minLength: {
                        value: 3,
                        message: "minimum lenght is 3 letters",
                      },
                      maxLength: {
                        value: 70,
                        message: "maximum length is 70 letters",
                      },
                    })}
                  />
                  {errors.subject && (
                    <div className="text-red-500">{errors.subject.message}</div>
                  )}
                </div>

                <div className="flex gap-3 flex-col">
                  <label className="text-2xl">Message</label>
                  <textarea
                    disabled={isSending}
                    placeholder="Enter your message"
                    className={`border-2 border-gray-300 px-5 py-2 rounded-lg ${
                      isSending ? "cursor-not-allowed" : "cursor-text"
                    }`}
                    {...register("message", {
                      required: {
                        value: true,
                        message: "please write message before sending",
                      },
                      minLength: {
                        value: 20,
                        message: "minimum message lenght is 20 letters",
                      },
                      maxLength: {
                        value: 500,
                        message: "maximum name length is 500 letters",
                      },
                    })}
                  ></textarea>
                  {errors.message && (
                    <div className="text-red-500">{errors.message.message}</div>
                  )}
                </div>

                <div className="w-full flex items-center justify-end">
                  <button
                    disabled={isSending}
                    type="submit"
                    className={`w-fit border-2 border-gray-300 px-5 py-2 rounded-lg my-2 hover:bg-gray-300 hover:text-black transition-colors duration-500 ${
                      isSending ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {isSending ? (
                      <div className="flex items-center gap-3">
                        {" "}
                        <div className="loader"></div> Sending
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="w-[30%] absolute right-0 h-full flex items-center justify-end z-20">
              <div className="w-[60%] border-l-2 border-t-2 border-b-2 border-gray-300 rounded-xl px-14 py-10 flex flex-col gap-8">
                <h3 className="font-semibold text-xl">Social Handles</h3>
                {links.map((link, idx) => {
                  return (
                    <a
                      href={link.url}
                      target="_blank"
                      key={idx}
                      className="flex items-center gap-3 hover:bg-gray-300 hover:rounded-lg hover:text-black transition-all duration-700 w-full pr-3 pl-2 py-1"
                    >
                      <img src={link.logo} alt={link.title} className="h-14" />
                      <h5>{link.title}</h5>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {showSuccess && <SuccessMessage setShowSuccess={setShowSuccess} />}

        <footer className="py-16 w-full flex items-center justify-center">
          <a className="font-semibold text-xl">&copy; Lomash Jangde</a>
        </footer>

            { isWarning && <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/70 w-screen z-50 md:hidden'>
        <div className='bg-black rounded-xl py-12 px-10 flex flex-col gap-5 items-center md:w-[40%] w-[90%]' style={{ boxShadow: "0 4px 12px #00FF7F" }}>
            <h2 className='text-2xl font-semibold'>Warning</h2>
            <p>This website is meant to be visited on desktop, mobile view can affect user experience significantly</p>
            <button onClick={()=> setIsWarning(false)} className='bg-[#00FF7F] hover:bg-[#00cf67] active:bg-[#00FF7F] text-black px-5 rounded-lg py-2 text-lg w-1/2 font-semibold cursor-pointer'>Got it</button>
        </div>
    </div>}
      </main>
    </div>
  );
};

export default Home;