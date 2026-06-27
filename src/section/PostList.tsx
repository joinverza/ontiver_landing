import { useState } from "react";
import Post from "./Post";
import { Values } from "../types/blog";

const list: Values[] = [
  {
    id: 1,
    img: "./assets/blog-man.png",
    title: " Identity Verification Should Be Reusable",
    author: "James Weick",
    time: "2 minutes read",
    views: "1.6k",
    shares: "996k",
    para: "Identity shouldn't restart every time a user joins a new platform. Discover how reusable identity reduces onboarding friction, lowers verification costs, and improves compliance outcomes.",
    date: "May 20th 2020",
    ref: "#post",
  },
  {
    id: 2,
    img: "./assets/blog-man.png",
    title: "Why Identity Verification Should Be Reusable",
    author: "James Weick",
    time: "2 minutes read",
    views: "1.6k",
    shares: "996k",

    para: "Identity shouldn't restart every time a user joins a new platform. Discover how reusable identity reduces onboarding friction, lowers verification costs, and improves compliance outcomes.",
    date: "May 20th 2020",
    ref: "#post",
  },
  {
    id: 3,
    img: "./assets/blog-man.png",
    title: "Why Identity Verification Should Be Reusable",
    author: "James Weick",
    time: "2 minutes read",
    views: "1.6k",
    shares: "996k",
    para: "Identity shouldn't restart every time a user joins a new platform. Discover how reusable identity reduces onboarding friction, lowers verification costs, and improves compliance outcomes.",
    date: "May 20th 2020",
    ref: "#post",
  },
  {
    id: 4,
    img: "./assets/blog-man.png",
    title: "Why Identity Verification Should Be Reusable",
    author: "James Weick",
    time: "2 minutes read",
    views: "1.6k",
    shares: "996k",
    para: "Identity shouldn't restart every time a user joins a new platform. Discover how reusable identity reduces onboarding friction, lowers verification costs, and improves compliance outcomes.",
    date: "May 20th 2020",
    ref: "#post",
  },
];

export default function PostList() {
  const [blogPost, setBlogPost] = useState<Values | null>(null);

  function handleClick(blog: Values) {
    setBlogPost(blog);
  }
  function handleBack() {
    setBlogPost(null);
  }

  return (
    <>
      {blogPost ? (
        <Post blog={blogPost} onBack={handleBack} />
      ) : (
        <div className="py-14 px-25 bg-bg-light">
          <div className=" flex flex-wrap">
            {list.map((blog, index) => {
              let width = "w-1/3";
              const remainder = list.length % 3;

              if (remainder === 1 && index === list.length - 1) {
                width = "w-full";
              }
              if (remainder === 2 && index >= list.length - 2) {
                width = "w-1/2";
              }

              return (
                <div
                  key={blog.id}
                  onClick={() => handleClick(blog)}
                  className={`bg-white py-6 px-5 rounded-3xl ${width} `}
                >
                  <img
                    className="w-full h-[237px] rounded-3xl"
                    src={blog.img}
                    alt={blog.title}
                  />
                  <div className="w-full py-8">
                    <h3 className="text-lg font-bold pb-4 text-[#05150E]">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-black/80">{blog.para}</p>
                  </div>
                  <div className="flex text-sm justify-between ">
                    <p>{blog.date}</p>
                    <a className="text-[#395D54] font-bold">Read more</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
