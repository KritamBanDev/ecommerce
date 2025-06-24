import Container from "@/components/Container";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="">
      <Container className="max-w-6xl lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10 animate-fade-in">
          <Image
            src="/logo.png"
            alt="E-commerce Logo"
            width={128}
            height={128}
            className="w-32 h-32 rounded-3xl shadow-xl border-4 border-fuchsia-200 bg-white object-contain mx-auto md:mx-0 transition-transform duration-300 hover:scale-105"
            priority
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gradient bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
              About E-commerce
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Elevate Your Style with the Best in Fashion
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Discover top fashion and lifestyle brands curated to help you look
              your best and feel confident — all in one place.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 animate-fade-in">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-fuchsia-700 mb-2">
              Our Mission
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300">
              To make shopping inspiring, easy, and accessible for everyone.
              Whether you’re searching for the latest trends, timeless classics, or
              exclusive deals, you’ll find it all here. We partner with trusted
              brands and designers to bring you quality products and a seamless
              online experience.
            </p>
            <h2 className="text-2xl font-bold text-fuchsia-700 mb-2">
              Why Shop With Us?
            </h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 text-base space-y-1">
              <li>Curated collections from top brands</li>
              <li>Exclusive offers and seasonal sales</li>
              <li>Fast, reliable shipping and easy returns</li>
              <li>Secure checkout and dedicated support</li>
              <li>Modern, mobile-friendly shopping experience</li>
              <li>Personalized recommendations and style tips</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-fuchsia-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-lg p-8 border border-fuchsia-100">
            <h3 className="text-xl font-bold text-fuchsia-600 mb-3">
              What Sets Us Apart?
            </h3>
            <ul className="list-none space-y-3 text-gray-700 dark:text-gray-300 text-base">
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                Trend-driven, quality-first approach
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                Passionate team of fashion experts
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                Community-focused and customer-centric
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                Sustainability and ethical sourcing
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center animate-fade-in">
          <p className="text-lg text-gray-700 dark:text-gray-200 italic font-medium max-w-2xl mx-auto">
            Thank you for choosing us as your style partner. Elevate your
            wardrobe, embrace your individuality, and enjoy shopping with
            E-commerce!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;