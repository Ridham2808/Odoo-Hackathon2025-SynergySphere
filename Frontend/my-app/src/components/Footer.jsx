import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Github,
  ArrowUp,
  Users,
  Target,
  Zap,
  Heart
} from 'lucide-react';

const Footer = ({ isDarkTheme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`relative ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    } overflow-hidden transition-all duration-300`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${
          isDarkTheme 
            ? 'bg-blue-500/20' 
            : 'bg-blue-500/10'
        } rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${
          isDarkTheme 
            ? 'bg-purple-500/20' 
            : 'bg-purple-500/10'
        } rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 ${
          isDarkTheme 
            ? 'bg-indigo-500/10' 
            : 'bg-indigo-500/5'
        } rounded-full blur-2xl animate-bounce`}></div>
      </div>

      {/* Animated Wave */}
      <div className="relative">
        <svg className={`w-full h-16 ${
          isDarkTheme ? 'text-gray-800' : 'text-gray-200'
        }`} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              values="0 0;-100 0;0 0"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              values="0 0;100 0;0 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              values="0 0;-50 0;0 0"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="group cursor-pointer">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                    <Zap className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                    SynergySphere
                  </h3>
                  <p className={`text-sm ${
                    isDarkTheme 
                      ? 'text-gray-300 group-hover:text-white' 
                      : 'text-gray-500 group-hover:text-gray-700'
                  } transition-colors duration-300`}>
                    by Syntax Sorcery
                  </p>
                </div>
              </div>
            </div>
            
            <p className={`text-lg leading-relaxed max-w-md ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Empowering teams to collaborate smarter, communicate better, and achieve extraordinary results together.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className={`text-center p-4 ${
                isDarkTheme 
                  ? 'bg-white/5 hover:bg-white/10' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } rounded-lg backdrop-blur-sm transition-all duration-300 group cursor-pointer`}>
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <div className={`text-2xl font-bold ${
                  isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}>10K+</div>
                <div className={`text-xs ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>Active Users</div>
              </div>
              <div className={`text-center p-4 ${
                isDarkTheme 
                  ? 'bg-white/5 hover:bg-white/10' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } rounded-lg backdrop-blur-sm transition-all duration-300 group cursor-pointer`}>
                <Target className="w-6 h-6 mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <div className={`text-2xl font-bold ${
                  isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}>50K+</div>
                <div className={`text-xs ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>Projects</div>
              </div>
              <div className={`text-center p-4 ${
                isDarkTheme 
                  ? 'bg-white/5 hover:bg-white/10' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } rounded-lg backdrop-blur-sm transition-all duration-300 group cursor-pointer`}>
                <Heart className="w-6 h-6 mx-auto mb-2 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                <div className={`text-2xl font-bold ${
                  isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}>99%</div>
                <div className={`text-xs ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className={`text-xl font-semibold mb-6 relative ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {['Dashboard', 'Projects', 'Team Members', 'Analytics', 'Settings', 'Help Center'].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`${
                      isDarkTheme 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    } hover:translate-x-2 transition-all duration-300 flex items-center group`}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-purple-400 transition-colors duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className={`text-xl font-semibold mb-6 relative ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}>
              Get in Touch
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className={`w-10 h-10 ${
                  isDarkTheme 
                    ? 'bg-blue-500/20 group-hover:bg-blue-500/40' 
                    : 'bg-blue-100 group-hover:bg-blue-200'
                } rounded-lg flex items-center justify-center transition-all duration-300`}>
                  <Mail className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className={`${
                  isDarkTheme 
                    ? 'text-gray-300 group-hover:text-white' 
                    : 'text-gray-600 group-hover:text-gray-900'
                } transition-colors duration-300`}>
                  hello@synergysphere.com
                </span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className={`w-10 h-10 ${
                  isDarkTheme 
                    ? 'bg-purple-500/20 group-hover:bg-purple-500/40' 
                    : 'bg-purple-100 group-hover:bg-purple-200'
                } rounded-lg flex items-center justify-center transition-all duration-300`}>
                  <Phone className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className={`${
                  isDarkTheme 
                    ? 'text-gray-300 group-hover:text-white' 
                    : 'text-gray-600 group-hover:text-gray-900'
                } transition-colors duration-300`}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className={`w-10 h-10 ${
                  isDarkTheme 
                    ? 'bg-pink-500/20 group-hover:bg-pink-500/40' 
                    : 'bg-pink-100 group-hover:bg-pink-200'
                } rounded-lg flex items-center justify-center transition-all duration-300`}>
                  <MapPin className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className={`${
                  isDarkTheme 
                    ? 'text-gray-300 group-hover:text-white' 
                    : 'text-gray-600 group-hover:text-gray-900'
                } transition-colors duration-300`}>
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={`mb-12 p-8 ${
          isDarkTheme 
            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/10' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200'
        } rounded-2xl backdrop-blur-sm border`}>
          <div className="max-w-2xl mx-auto text-center">
            <h4 className={`text-2xl font-bold mb-4 ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}>Stay Updated</h4>
            <p className={`mb-6 ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}>Get the latest updates on new features and team collaboration tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 ${
                  isDarkTheme 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-blue-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                } border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300`}
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className={`border-t ${
          isDarkTheme ? 'border-white/10' : 'border-gray-200'
        } pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: 'hover:text-blue-500', bg: 'hover:bg-blue-500/20' },
                { icon: Twitter, color: 'hover:text-sky-400', bg: 'hover:bg-sky-400/20' },
                { icon: Linkedin, color: 'hover:text-blue-600', bg: 'hover:bg-blue-600/20' },
                { icon: Instagram, color: 'hover:text-pink-500', bg: 'hover:bg-pink-500/20' },
                { icon: Github, color: 'hover:text-gray-400', bg: 'hover:bg-gray-400/20' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-12 h-12 ${
                    isDarkTheme ? 'bg-gray-900/50 border border-gray-800' : 'bg-gray-100'
                  } rounded-lg flex items-center justify-center ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                  } ${social.color} ${social.bg} transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <social.icon className="w-5 h-5 group-hover:animate-pulse" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className={`text-sm ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}>
                © 2024 SynergySphere by <span className="text-purple-400 font-semibold">Syntax Sorcery</span>. All rights reserved.
              </p>
              <p className={`text-xs mt-1 ${
                isDarkTheme ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Made with <Heart className="w-3 h-3 inline text-red-400 animate-pulse" /> for amazing teams
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 group"
        >
          <ArrowUp className="w-5 h-5 mx-auto group-hover:animate-bounce" />
        </button>
      )}
    </footer>
  );
};

export default Footer;