const Card = () => {
  return (
    <div className="grid gap-12 md:grid-cols-3 md:gap-5 my-3">
      <div className="rounded-xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
          <img src="./money.svg" alt="" className="h-3/4" />
        </div>
        <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">
          Cost Savings
        </h1>
        <p className="px-4 text-gray-500">
          By choosing our solutions, customers can save money in the long run
          through reduced energy costs, making sustainability financially
          advantageous.
        </p>
      </div>
      <div
        data-aos-delay="150"
        className="rounded-xl bg-white p-6 text-center shadow-xl"
      >
        <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
          <svg
            viewBox="0 0 33 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
          >
            <path
              d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <h1 className="text-darken mb-3 text-xl font-medium lg:px-14 ">
          Sustainable Solutions
        </h1>
        <p className="px-4 text-gray-500">
          We offer renewable energy solutions harnessing solar, wind, and hydro
          power, leading the way in environmental stewardship and reducing
          carbon emissions.
        </p>
      </div>
      <div
        data-aos-delay="300"
        className="rounded-xl bg-white p-6 text-center shadow-xl"
      >
        <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
          <svg
            viewBox="0 0 55 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
          >
            <path
              d="M8.25 19.25C11.2836 19.25 13.75 16.7836 13.75 13.75C13.75 10.7164 11.2836 8.25 8.25 8.25C5.21641 8.25 2.75 10.7164 2.75 13.75C2.75 16.7836 5.21641 19.25 8.25 19.25ZM46.75 19.25C49.7836 19.25 52.25 16.7836 52.25 13.75C52.25 10.7164 49.7836 8.25 46.75 8.25C43.7164 8.25 41.25 10.7164 41.25 13.75C41.25 16.7836 43.7164 19.25 46.75 19.25ZM49.5 22H44C42.4875 22 41.1211 22.6102 40.1242 23.5984C43.5875 25.4977 46.0453 28.9266 46.5781 33H52.25C53.7711 33 55 31.7711 55 30.25V27.5C55 24.4664 52.5336 22 49.5 22ZM27.5 22C32.8195 22 37.125 17.6945 37.125 12.375C37.125 7.05547 32.8195 2.75 27.5 2.75C22.1805 2.75 17.875 7.05547 17.875 12.375C17.875 17.6945 22.1805 22 27.5 22ZM34.1 24.75H33.3867C31.5992 25.6094 29.6141 26.125 27.5 26.125C25.3859 26.125 23.4094 25.6094 21.6133 24.75H20.9C15.4344 24.75 11 29.1844 11 34.65V37.125C11 39.4023 12.8477 41.25 15.125 41.25H39.875C42.1523 41.25 44 39.4023 44 37.125V34.65C44 29.1844 39.5656 24.75 34.1 24.75ZM14.8758 23.5984C13.8789 22.6102 12.5125 22 11 22H5.5C2.46641 22 0 24.4664 0 27.5V30.25C0 31.7711 1.22891 33 2.75 33H8.41328C8.95469 28.9266 11.4125 25.4977 14.8758 23.5984Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <h1 className="text-darken mb-3 pt-3 text-xl font-medium lg:h-14 lg:px-14">
          Expertise and Innovation
        </h1>
        <p className="px-4 text-gray-500">
          Our projects are driven by expertise, innovation, and a deep sense of
          responsibility, ensuring high-quality, efficient, and effective
          solutions for a cleaner, greener future.
        </p>
      </div>
    </div>
  );
};

export default Card;
