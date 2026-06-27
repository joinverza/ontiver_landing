import Button from "../components/base/Button";
import { Values } from "../types/blog";
interface PostProps {
  blog: Values;
  onBack: () => void;
}

export default function Post({ blog, onBack }: PostProps) {
  return (
    <div>
      <div
        className="relative bg-cover h-[572px]"
        style={{ backgroundImage: `url(${blog.img})` }}
      >
        <button
          onClick={onBack}
          className="absolute top-[160px] left-[119px] rounded-3xl py-1 px-4 text-white flex gap-3"
        >
          <img src="./assets/arrow-left.svg" alt="left-arrow" />
          Back
        </button>
        <div className="absolute w-[595px] top-[286px] left-[125px] text-white">
          <div className="shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
            <h2 className="pb-8 text-5xl">{blog.title}</h2>
          </div>
          <div className="flex gap-3">
            <p>by {blog.author}</p>
            <div className="flex gap-2">
              <div className="">
                <img
                  className="absolute left-[5px] top-[5px]"
                  src="./assets/clock-circle.svg"
                  alt="clock-circle"
                />
                <img
                  className="absolute left-[9.67px] top-[8.11px]"
                  src="./assets/clock-hand.svg"
                  alt="clock-hand"
                />
              </div>

              <p>{blog.time}</p>
            </div>
            <div className="flex">
              <img src="./assets/views.svg" alt="views" />
              <div>{blog.views}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-13 bg-bg-light px-33 py-10">
        <div className="w-1/9">
          <div>
            <img src="./assets/views-post.svg" alt="views-icon" />
            <p>views</p>
            <p>{blog.views}</p>
          </div>
          <div className="py-15">
            <img src="./assets/share.svg" alt="share-icon" />
            <p>views</p>
            <p>{blog.shares}</p>
          </div>
          <div>
            <div>
              <img src="./assets/facebook-post.svg" alt="facebook-icon" />
              <p>125</p>
            </div>
            <div className="py-4">
              <img src="./assets/twitter-post.svg" alt="twitter-icon" />
            </div>
            <div>
              <img src="./assets/pinterest.svg" alt="pinterest-icon" />
              <p>425</p>
            </div>
          </div>
        </div>
        <div className="w-5/9">{blog.para}</div>
        <div className="w-3/9">
          <h2 className="text-2xl">Follow Us</h2>
          <div className="pt-10 pb-15 flex justify-between items-center gap-12">
            <div className="flex flex-col gap-4">
              <img src="./assets/facebook-post.svg" alt="facebook-icon" />
              <p>10</p>
            </div>
            <div className="flex flex-col gap-4">
              <img src="./assets/twitter-post.svg" alt="twitter-icon" />
              <p>69k</p>
            </div>
            <div className="flex flex-col gap-4">
              <img src="./assets/insta-post.svg" alt="insta-icon" />
              <p>45</p>
            </div>
            <div className="flex flex-col gap-4">
              <img src="./assets/pinterest.svg" alt="pinterest-icon" />
              <p>69k</p>
            </div>
            <div className="flex flex-col gap-4">
              <img src="./assets/tube-post.svg" alt="youtube-icon" />
              <p>69k</p>
            </div>
          </div>
          <p className="leading-[30px]">
            Subscription Subscribe to our newsletter and receive a selection of
            cool articles every weeks
          </p>
          <div className="py-6">
            <input
              placeholder="Enter your email"
              className="border-1 w-full mb-4 rounded-3xl border-[#CECECE] py-5 px-6"
            />
            <Button
              text="SUBSCRIBE"
              className="bg-white border-1 w-full text-green border-green py-5 px-6 text-lg font-semibold leading-[30px] tracking-[25%] rounded-3xl "
            />
          </div>
          <div className="flex justify-between items-center gap-3">
            <input type="checkbox" className="h-[24px] w-[24px]" />
            <p>
              By checking this box, you confirm that you have read and are
              agreeing to our terms of use regarding the storage of the data
              submitted through this form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
