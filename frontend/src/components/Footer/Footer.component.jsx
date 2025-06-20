import LOGO from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-black/70 bg-white">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-primary/30 pb-6">
        <div className="md:max-w-96">
          <img className="w-20 h-15" src={LOGO} alt="dummyLogoDark" />
          <p className="mt-4 text-sm">
            Join the AceBot community - where confidence meets opportunity.
            Prepare smarter, perform better, and achieve more with personalized
            interview insights.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-black/90">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#work">How it Works</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-black/90 mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-2">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-black/50 placeholder-black/50 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-primary w-24 h-9 text-[#FFFFFF] rounded cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 © AceBot AI. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
