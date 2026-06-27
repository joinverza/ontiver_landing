interface Values {
  img: string;
  alt: string;
  dets?: string;
}

const details: Values[] = [
  {
    img: "./assets/call.svg",
    alt: "call-icon",
    dets: "+1012 3456 789",
  },
  {
    img: "./assets/sms.svg",
    alt: "sms-icon",
    dets: "demo@gmail.com",
  },
  {
    img: "./assets/location.svg",
    alt: "location-icon",
    dets: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
  },
];

const icons = [
  {
    img: "./assets/X.svg",
    alt: "X-icon",
  },
  {
    img: "./assets/insta.svg",
    alt: "insta-icon",
  },
  {
    img: "./assets/discord.svg",
    alt: "discord-icon",
  },
];

export default function Calculate() {
  return (
    <div className="bg-bg-light">
      <div>
        <h1 className="text-[40px] w-[784px] text-center mx-auto font-medium">
          Let's Build Trust Infrastructure Together
        </h1>
        <p className="text-sm font-medium w-[660px] text-center mx-auto text-black/80">
          Whether you're launching a fintech, scaling a marketplace, or
          designing a compliance workflow, our team can help you choose the
          right identity solution.
        </p>
      </div>
      <div className="flex gap-4">
        <div className="bg-gradient-to-r text-white from-dark-primary to-light-primary rounded-3xl p-10 ml-30 mt-12">
          <div className="">
            <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
            <p className="text-xs text-[#C9C9C9]">
              Say something to start a live chat!
            </p>
          </div>
          <div className="py-10">
            {details.map((info: Values) => {
              return (
                <div className="flex gap-6 mb-4 w-[337px]">
                  <img src={info.img} alt={info.alt} />
                  <p>{info.dets}</p>
                </div>
              );
            })}
          </div>
          <div className="flex gap-x-5">
            {icons.map((icon, index) => {
              return (
                <div className=" rounded">
                  <img
                    className={`p-[10px]  rounded-full ${index === 1 ? "bg-white" : "bg-green"}`}
                    src={icon.img}
                    alt={icon.alt}
                  />
                </div>
              );
            })}
          </div>
       
        </div>
        <div className="w-[780px] bg-white mt-12 rounded-3xl px-9 py-16">
          <div className="flex gap-8 flex-wrap">
            <div className="w-2/4 flex flex-col">
              <label>First Name</label>
              <input className="border-b outline-none" />
            </div>
            <div className="w-1/4 flex flex-col">
              <label>Work email</label>
              <input className="border-b outline-none" />
            </div>
            <div className="w-2/4 flex flex-col">
              <label>Company Name</label>
              <input className="border-b outline-none" />
            </div>
            <div className="w-1/4 flex flex-col">
              <label>Company Size</label>
              <input className="border-b outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <label>Message</label>
            <textarea
              placeholder="Write Your Message"
              className="border-b outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
