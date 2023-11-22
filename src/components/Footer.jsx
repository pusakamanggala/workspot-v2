const Footer = () => {
  return (
    <footer className="bg-teal-400 text-black py-6 md:relative flex flex-col items-center">
      <div className="container mx-auto text-center">
        <p className="mt-2">
          Designed and built with ❤️ by{" "}
          <a
            href="https://pusakamanggala.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Pusaka Manggala
          </a>
        </p>
      </div>
      <div className="md:absolute md:right-0 text-sm md:bottom-2 font-semibold text-white">
        <h1>
          Illustration by{" "}
          <a
            href="https://undraw.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-black"
          >
            unDraw
          </a>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
