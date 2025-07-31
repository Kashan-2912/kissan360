import { useState, useEffect } from "react";
import {
  Search,
  Settings,
  Bell,
  ShoppingCart,
  Store,
  Leaf,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  Globe,
  Star,
} from "lucide-react";
import Logo from "../assets/Logo2.png";
import { useNavigate } from "react-router-dom";

const FMSLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Fresh Produce",
      description: "Direct from farm to your doorstep",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Best Prices",
      description: "Competitive marketplace pricing",
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Assured",
      description: "Verified sellers and products",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Connect with local farmers",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  const moveSell = () => {
    navigate("/sell");
  }

  const movePurchase = () => {
    navigate("/purchase");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden font-[Montserrat]">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Static Gradient Orbs with Slow Animation */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-green-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-32 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl animate-float-slow-reverse" />
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400/8 to-pink-500/8 rounded-full blur-3xl animate-float-slow-delayed" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow-reverse {
          0%,
          100% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(10px);
          }
        }

        @keyframes float-slow-delayed {
          0%,
          100% {
            transform: translateY(-5px);
          }
          50% {
            transform: translateY(-25px);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 12s ease-in-out infinite 2s;
        }
      `}</style>

      {/* Header */}
      <header className="relative z-50 bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 ml-4">
            <img
              src={Logo || "/placeholder.svg"}
              className="w-[28px] h-[57px]"
              alt="Farm Management System Logo"
            />
            <div>
              <div className="tracking-normal w-[160px] h-[22px] font-[Niramit] uppercase text-[17px] leading-[100%] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#05ff69] to-[#31f700]">
                FARM MANAGEMENT
              </div>
              <div className="tracking-normal w-[64px] h-[22px] font-[Niramit] uppercase text-[17px] leading-[100%] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#05ff69] to-[#31f700]">
                SYSTEM
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Search className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Settings className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <Bell className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
              </div>

              <div className="flex items-center gap-3 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full transform group-hover:scale-110 transition-all duration-300" />
                <div>
                  <p className="text-sm font-medium text-white font-[Montserrat]">
                    Albert John
                  </p>
                  <p className="text-xs text-gray-300 font-[Montserrat]">
                    albert@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div
            className={`text-center max-w-6xl mx-auto transition-all duration-2000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm mb-8 animate-pulse">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium font-[Montserrat]">
                Revolutionary Farm Marketplace
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            </div>

            {/* Main Title */}
            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-[#13783C] to-[#38BE17] font-[Montserrat]">
              <span className="animate-pulse text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                FMS Marketplace
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light font-[Montserrat]">
              Experience the future of agriculture with our revolutionary
              marketplace that
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#05ff69] to-[#31f700] font-medium font-[Montserrat]">
                {" "}
                connects farmers globally
              </span>{" "}
              and
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#05ff69] to-[#31f700] font-medium font-[Montserrat]">
                {" "}
                transforms agricultural commerce
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-20">
              <button
                onClick={moveSell}
                className="cursor-pointer group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-green-400/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 w-full lg:w-96 shadow-2xl hover:shadow-green-500/25"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-600/0 group-hover:from-green-500/20 group-hover:to-emerald-600/20 transition-all duration-500" />

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/0 to-emerald-500/0 group-hover:from-green-400/50 group-hover:to-emerald-500/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                    <Store className="w-12 h-12 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors duration-300 font-[Montserrat]">
                    Sell Products
                  </h3>

                  <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 mb-6 text-lg font-[Montserrat]">
                    Transform your agricultural business with our cutting-edge
                    selling platform
                  </p>

                  <div className="flex items-center gap-2 text-green-400 group-hover:gap-4 transition-all duration-300">
                    <span className="font-medium font-[Montserrat]">
                      Start Selling
                    </span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </button>

              <button
                onClick={movePurchase}
                className="cursor-pointer group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 w-full lg:w-96 shadow-2xl hover:shadow-blue-500/25"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-600/0 group-hover:from-blue-500/20 group-hover:to-indigo-600/20 transition-all duration-500" />

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/0 to-indigo-500/0 group-hover:from-blue-400/50 group-hover:to-indigo-500/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-xl">
                    <ShoppingCart className="w-12 h-12 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300 font-[Montserrat]">
                    Purchase Items
                  </h3>

                  <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 mb-6 text-lg font-[Montserrat]">
                    Discover premium agricultural products from verified global
                    suppliers
                  </p>

                  <div className="flex items-center gap-2 text-blue-400 group-hover:gap-4 transition-all duration-300">
                    <span className="font-medium font-[Montserrat]">
                      Start Shopping
                    </span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transform hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-3 text-center group-hover:text-green-300 transition-colors duration-300 font-[Montserrat]">
                      {feature.title}
                    </h4>

                    <p className="text-gray-400 text-center group-hover:text-gray-200 transition-colors duration-300 font-[Montserrat]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="relative py-24 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-y border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5" />

          <div className="relative z-10 container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6 font-[Montserrat]">
                Powering Agricultural Excellence
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-[Montserrat]">
                Trusted by thousands of farmers and suppliers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
              {[
                {
                  number: "10,000+",
                  label: "Active Farmers",
                  icon: <Users className="w-8 h-8" />,
                },
                {
                  number: "50,000+",
                  label: "Products Listed",
                  icon: <Globe className="w-8 h-8" />,
                },
                {
                  number: "99.8%",
                  label: "Customer Satisfaction",
                  icon: <Star className="w-8 h-8" />,
                },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-green-400/50 transform hover:-translate-y-2 transition-all duration-500 shadow-xl">
                    <div className="text-green-400 mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-3 transform group-hover:scale-110 transition-transform duration-300 font-[Montserrat]">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-lg font-medium font-[Montserrat]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-24">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-br from-[#05ff69] to-[#31f700] pb-3 font-[Montserrat]">
                Ready to Transform Agriculture?
              </h2>

              <p className="text-2xl text-gray-300 mb-12 leading-relaxed font-[Montserrat]">
                Join the revolution and be part of the future of farming
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 font-[Montserrat]">
                  <span className="relative z-10">Get Started Today</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button className="group px-12 py-4 border-2 border-white/30 rounded-full text-white font-bold text-lg hover:border-green-400 hover:text-green-400 transform hover:scale-105 transition-all duration-300 font-[Montserrat]">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FMSLandingPage;
