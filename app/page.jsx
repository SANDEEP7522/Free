import HeroSection from "@/components/Hero/Hero";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <HeroSection />

      {/* Stats of the app price place */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              >
                <div className="text-3xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-gray-700 text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-200 mb-4">
        <div className="max-w-6xl mx-auto px-4  ">
          {/* Section Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-400 text-center mb-8">
            Everything You Need to Manage Your Finance
          </h1>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="p-6 shadow-lg rounded-lg bg-white transition-transform duration-300 hover:scale-105"
              >
                <CardContent className="flex flex-col items-center text-center">
                  <div className="text-4xl text-gray-600-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100 mb-4">
        <div className="max-w-6xl mx-auto px-4  ">
          {/* Section Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-400 text-center mb-8">
            How it works
          </h1>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {howItWorksData.map((step, index) => (
              <Card
                key={index}
                className="p-6 shadow-lg rounded-lg bg-white transition-transform duration-300 hover:scale-105"
              >
                <CardContent className="flex flex-col items-center text-center">
                  <div className="text-4xl text-gray-600-500 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-200 mb-4">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-600 text-center mb-8">
            What My Clients Say
          </h1>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 shadow-lg rounded-xl bg-white transition-transform duration-300 hover:scale-105"
              >
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  {/* Profile Image */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full shadow-md object-cover"
                  />

                  {/* Name & Role */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 italic">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Control Your Finances?
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-6">
            Sign up with Wealth AI for free today and start managing your
            finances like a pro.
          </p>
          <div className="inline-block">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold shadow-md transition-transform duration-300 hover:bg-blue-100 hover:scale-105"
              >
                Get Started 🚀
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
