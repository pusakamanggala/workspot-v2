import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UserReviews = () => {
  const reviewsData = [
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=male&seed=${Math.random()}`,
      name: "John Doe",
      job: "IT Professional",
      review:
        "I had a great experience using the platform. It helped me find the perfect job!",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=female&seed=${Math.random()}`,
      name: "Jane Smith",
      job: "Software Engineer",
      review:
        "The platform made my job search easier and more efficient. Highly recommended!",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=male&seed=${Math.random()}`,
      name: "Mike Johnson",
      job: "Web Developer",
      review: "I found my dream job through this website. It's a game-changer!",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=female&seed=${Math.random()}`,
      name: "Sarah Brown",
      job: "Graphic Designer",
      review:
        "This platform is fantastic! It connected me with great job opportunities in my field.",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=male&seed=${Math.random()}`,
      name: "Alex Wilson",
      job: "Data Scientist",
      review:
        "As a data scientist, I appreciate the data-driven job recommendations. It's impressive!",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=female&seed=${Math.random()}`,
      name: "Emily Davis",
      job: "Marketing Specialist",
      review:
        "I love the user-friendly interface. It made my job search hassle-free and efficient.",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=male&seed=${Math.random()}`,
      name: "Michael Lee",
      job: "UX/UI Designer",
      review:
        "The platform's design and usability are top-notch. It's a valuable resource for job seekers.",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=female&seed=${Math.random()}`,
      name: "Sophia Clark",
      job: "Project Manager",
      review:
        "I found my dream project management job through this platform. It's a career-changer!",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=male&seed=${Math.random()}`,
      name: "Daniel White",
      job: "Sales Executive",
      review:
        "The platform's job matching algorithms are excellent. It connected me with my ideal job.",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=female&seed=${Math.random()}`,
      name: "Olivia Adams",
      job: "Software Developer",
      review:
        "I was able to land a great software development job using this platform. It's a game-changer!",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=male&seed=${Math.random()}`,
      name: "William Brown",
      job: "Network Engineer",
      review:
        "As a network engineer, I found the perfect job opportunity through this platform. Highly recommended!",
    },
    {
      profileImg: `https://xsgames.co/randomusers/avatar.php?g=female&seed=${Math.random()}`,
      name: "Ella Harris",
      job: "Marketing Manager",
      review:
        "The platform's marketing job listings helped me advance in my career. It's an excellent resource for job seekers!",
    },
  ];

  const settings = {
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          rows: 2,
          slidesPerRow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          rows: 2,
          slidesPerRow: 1,
        },
      },
    ],
  };

  return (
    <section className="space-y-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <q
          className="font-semibold text-xl md:text-2xl lg:text-3xl text-teal-400"
          data-sal-duration="1000"
          data-sal="slide-up"
          data-sal-easing="ease-out-bounce"
          data-sal-delay="500"
        >
          Embrace Challenges and Find Opportunities
        </q>
        <p
          className="text-lg md:text-xl lg:text-2xl font-semibold"
          data-sal-duration="1000"
          data-sal="slide-up"
          data-sal-delay="700"
          data-sal-easing="ease-out-bounce"
        >
          <q>In the middle of difficulty lies opportunity</q> -{" "}
          <span className="font-bold">Albert Einstein</span>
        </p>
      </div>
      {/* user review card*/}
      <div
        data-sal-duration="1000"
        data-sal="slide-up"
        data-sal-delay="800"
        data-sal-easing="ease-out-bounce"
      >
        <Slider {...settings}>
          {reviewsData.map((review, index) => (
            <div key={index}>
              <div className="flex flex-col gap-2 shadow-md bg-white  p-5 rounded-md m-2 ">
                <div className="flex gap-5 items-center">
                  <img
                    src={review.profileImg}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-gray-400">{review.job}</p>
                  </div>
                </div>
                <p>{review.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default UserReviews;
