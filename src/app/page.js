"use client";
import { useEffect } from "react";
import React from "react";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import { projectsData } from "./projectData";
import { useForm } from "react-hook-form";

const Home = () => {
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      message:
        "Hello, I am interested in connecting regarding a potential project or collaboration.",
    },
  });

  const contactSubmit = async (data) => { 
    console.log("contact form data", data);
   }

  return (
    <div className="h-screen">
      <header className="flex justify-end w-full items-center h-[10%] fixed top-0">
        <nav className="flex gap-5 justify-between items-center text-xl  h-full px-10 relative rounded-bl-3xl">
          <Link className="z-20" href={"#hero"}>
            Home
          </Link>
          <Link className="z-20" href={"#about"}>
            About
          </Link>
          <Link className="z-20" href={"#projects"}>
            Projects
          </Link>
          <Link className="z-20" href={"#contact"}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="h-[90%]">
        <section id="hero" className="h-full w-full flex items-center ">
          <div className="w-[70%] h-full pl-28 py-10 flex items-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-8xl font-bold font-ubuntu">Lomash Jangde</h1>
              <p className="text-3xl font-semibold">
                A Fullstack Web Developer
              </p>
              <a
                data-no-cursor="true"
                href="#"
                className="text-2xl underline hover:bg-white hover:text-black hover:px-5 hover:py-2 hover:rounded-lg transition-all duration-700 w-fit"
              >
                Connect
              </a>
            </div>
          </div>

          <div className="w-[30%] h-full flex justify-center items-center">
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
          className="py-10 h-full w-full flex flex-col justify-center items-center px-28 gap-16"
        >
          <h2 className="text-6xl font-semibold">About me</h2>
          <p className="text-5xl text-justify leading-16">
            I am a Full-Stack MERN Developer focused on building clean,
            reliable, and efficient web applications. I follow a disciplined
            approach to development and value clarity, structure, and long-term
            maintainability in every project. My work reflects consistency,
            responsibility, and a commitment to continuous improvement.
          </p>
        </section>

        <section
          id="projects"
          className="py-10 w-full flex flex-col justify-center items-center px-28 gap-16"
        >
          <h2 className="text-6xl font-semibold">Projects</h2>

          <div className="flex flex-col gap-20">
            {projectsData.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="py-10 w-full flex flex-col justify-center items-center px-28 gap-16 overflow-hidden"
        >
          <h2 className="text-6xl font-semibold">Skills</h2>
          <div className="grid grid-cols-6 gap-20">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-5 float transition-transform duration-500 hover:scale-125"
              >
                <div className="w-32 h-32 flex items-center justify-center">
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
          <h2 id="contact" className="text-6xl font-semibold text-center py-10">
            Get in Touch
          </h2>

          <div className="w-full flex items-center relative">
            <form onSubmit={handleSubmit(contactSubmit)} className="w-full flex flex-col gap-5 mx-16 items-center">
              <div className="w-[50%] border-2 border-gray-300 rounded-xl p-10 flex flex-col gap-5">
                <h2 className="text-4xl font-semibold mb-5">Contact Me</h2>
                <div className="flex gap-3 flex-col">
                  <label className="text-2xl">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border-2 border-gray-300 px-5 py-2 rounded-lg capitalize"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "please enter your name",
                      },
                      minLength: {
                        value: 3,
                        message: "minimum name lenght is 3 letters"
                      },
                      maxLength: {
                        value: 50,
                        message: "maximum name length is 50 letters"
                      }
                    })}
                  />
                  {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                </div>

                <div className="flex gap-3 flex-col">
                  <label className="text-2xl">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="border-2 border-gray-300 px-5 py-2 rounded-lg"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "please enter your email",
                      },
                      minLength: {
                        value: 3,
                        message: "minimum email lenght is 3 letters"
                      },
                      maxLength: {
                        value: 50,
                        message: "maximum email length is 50 letters"
                      }
                    })}
                  />
                  {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </div>

                <div className="flex gap-3 flex-col">
                  <label className="text-2xl">Message</label>
                  <textarea
                    placeholder="Enter your message"
                    className="border-2 border-gray-300 px-5 py-2 rounded-lg"
                    {...register("message", {
                      required: {
                        value: true,
                        message: "please write message before sending",
                      },
                      minLength: {
                        value: 20,
                        message: "minimum message lenght is 20 letters"
                      },
                      maxLength: {
                        value: 500,
                        message: "maximum name length is 500 letters"
                      }
                    })}
                  ></textarea>
                  {errors.message && <div className="text-red-500">{errors.message.message}</div>}
                </div>

                <div className="w-full flex items-center justify-end">
                  <input
                    type="submit"
                    value="Send Message"
                    className="w-fit border-2 border-gray-300 px-5 py-2 rounded-lg my-2 hover:bg-gray-300 hover:text-black transition-colors duration-500"
                  />
                </div>
              </div>
            </form>

            <div className="w-[30%] absolute right-0 h-full flex items-center justify-end">
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

        <footer className="py-16 w-full flex items-center justify-center">
          <a className="font-semibold text-xl">&copy; Lomash Jangde</a>
        </footer>
      </main>
    </div>
  );
};

export default Home;
