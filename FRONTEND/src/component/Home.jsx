import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import MarketTicker from "./MarketTicker";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn, user } = useAuth();
  const [showBuyerPopup, setShowBuyerPopup] = useState(false);
  const handleGetStarted = () => {
    if (isLoggedIn && user) {
      const role = (user.Role || user.role || "").toLowerCase();
      if (role === "farmer") navigate("/farmers/dashboard");
      else if (role === "buyer") navigate("/buyers/dashboard");
      else navigate("/admin/dashboard");
    } else {
      navigate("/register");
    }
  };
  const handleExploreMarket = () => {
    const role = (user?.Role || user?.role || "").toLowerCase();
    if (isLoggedIn && role === "buyer") {
      navigate("/buyers/marketplace");
    }
    else {
      setShowBuyerPopup(true);
    }
  };

  const handleNavClick = (path) => {
    navigate(path);
  };
  const handleBuyerLoginRedirect = () => {
    navigate("/login", { state: { role: "buyer" } });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-green-100 selection:text-green-800">
      <section className="relative w-full pt-6 pb-24 lg:pt-12 lg:pb-40 overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left z-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold tracking-widest uppercase mb-8">
                {t('hero.future')}
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1]" dangerouslySetInnerHTML={{ __html: t('hero.title') }}>
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-emerald-200 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  {isLoggedIn ? t('hero.goToDashboard') : t('hero.getStarted')}
                </button>
                <button
                  onClick={handleExploreMarket}
                  className="bg-white border-2 border-gray-100 hover:border-emerald-600 text-gray-700 hover:text-emerald-700 px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:-translate-y-1"
                >
                  {t('hero.exploreNow')}
                </button>
              </div>
              <div className="mt-12 flex items-center gap-6 text-sm font-semibold text-gray-500">
                <div className="flex -space-x-4">
                  <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
                  <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User" />
                  <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" />
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-green-100 text-green-700 flex items-center justify-center text-xs">+2k</div>
                </div>
                <p>Join 1+ farmers today.</p>
              </div>
            </div>
            <div className="relative hidden lg:block h-[600px]">
              <div className="absolute right-0 top-0 w-5/6 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white z-10 hover:scale-[1.01] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800" 
                  alt="Farmer field" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="absolute left-[-5%] bottom-10 w-1/2 h-64 rounded-[2rem] overflow-hidden shadow-2xl border-[12px] border-white z-20 hover:scale-[1.05] transition-transform duration-500 group">
                <img 
                  src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=600" 
                  alt="Farmers" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute right-[-10px] bottom-[5%] w-2/5 h-48 rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-white z-30 hover:scale-[1.1] transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600" 
                  alt="Crops" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-[5%] left-[10%] bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 z-40 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    📈
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t('hero.marketStatus')}</p>
                    <p className="text-emerald-700 font-black text-lg">{t('hero.ricePrice')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MarketTicker 
        items={[
          { crop: "Wheat", price: "2200", trend: "↑" },
          { crop: "Rice", price: "1800", trend: "↓" },
          { crop: "Corn", price: "1500", trend: "↑" },
          { crop: "Potato", price: "1200", trend: "↓" },
          { crop: "Tomato", price: "2800", trend: "↑" },
          { crop: "Onion", price: "1850", trend: "↓" },
          { crop: "Mustard", price: "5400", trend: "↑" },
          { crop: "Cotton", price: "7200", trend: "↑" },
        ]} 
      />
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{t('timeline.title')}</h2>
            <p className="text-gray-500 text-lg">{t('timeline.subtitle')}</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-300 border-t-2 border-dashed border-gray-300 z-0"></div>

            {[
              { title: t('timeline.step1Title'), desc: t('timeline.step1Desc'), icon: "📝", color: "blue" },
              { title: t('timeline.step2Title'), desc: t('timeline.step2Desc'), icon: "🤝", color: "green" },
              { title: t('timeline.step3Title'), desc: t('timeline.step3Desc'), icon: "💰", color: "orange" }
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center group">
                <div className={`w-24 h-24 mx-auto bg-white rounded-3xl border-4 border-white shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-${step.color}-200`}>
                  <span className="text-4xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 px-6 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full h-[400px] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80"
          alt="Wide farm"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <p className="text-white text-4xl md:text-6xl font-black italic opacity-20 select-none">Sustainable Farming • Direct Access • Fair Pricing</p>
        </div>
      </div>
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs">{t('ecosystem.subtitle')}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">{t('ecosystem.title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏷️", color: "green", title: t('ecosystem.directSelling'),
                desc: t('ecosystem.directSellingDesc'),
                path: "/buyers/marketplace"
              },
              {
                icon: "📜", color: "blue", title: t('ecosystem.govtSchemes'),
                desc: t('ecosystem.govtSchemesDesc'),
                path: "/services"
              },
              {
                icon: "🤖", color: "purple", title: t('ecosystem.aiAssistant'),
                desc: t('ecosystem.aiAssistantDesc'),
                path: "/chatbot"
              },
              {
                icon: "🚚", color: "orange", title: t('ecosystem.smartLogistics'),
                desc: t('ecosystem.smartLogisticsDesc'),
                path: "/buyers/orders"
              }
            ].map((item, i) => (
              <div key={i} onClick={() => navigate(item.path)} className="bg-gray-50 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className={`w-14 h-14 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:rotate-6 transition-transform`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gray-900 py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
            {[
              { label: t('stats.activeFarmers'), val: "50+" },
              { label: t('stats.transactions'), val: "₹10000+" },
              { label: t('stats.govtSchemes'), val: "30+" },
              { label: t('stats.support'), val: "24/7" }
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2">
                  {stat.val}
                </h3>
                <p className="text-green-400 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
              <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGetStarted}
                  className="bg-white text-green-900 px-10 py-4 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg"
                >
                  {isLoggedIn ? t('cta.goToDashboard') : t('cta.joinNow')}
                </button>
                <button
                  onClick={() => handleNavClick("/contact")}
                  className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  {t('cta.contactSupport')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl">🌾</span>
                <span className="text-2xl font-bold text-white tracking-tight">FarmLink</span>
              </div>
              <p className="text-sm leading-relaxed">
                Building a resilient agricultural community through technology, trust, and transparency.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={handleExploreMarket} className="hover:text-green-400 transition-colors">Marketplace</button></li>
                <li><button onClick={() => handleNavClick("/services")} className="hover:text-green-400 transition-colors">Govt Schemes</button></li>
                <li><button onClick={() => handleNavClick("/chatbot")} className="hover:text-green-400 transition-colors">AI Assistant</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => handleNavClick("/about")} className="hover:text-green-400 transition-colors">About Us</button></li>
                <li><button onClick={() => handleNavClick("/contact")} className="hover:text-green-400 transition-colors">Contact</button></li>
                <li><button onClick={handleGetStarted} className="hover:text-green-400 transition-colors">Join Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><span className="w-6 opacity-50">📧</span> help@farmlink.in</li>
                <li className="flex items-center"><span className="w-6 opacity-50">📞</span> 1800-KISHAN-HELP</li>
                <li className="flex items-center"><span className="w-6 opacity-50">📍</span> Noida, Uttar Pradesh India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} FarmLink. Made with 💚 in India.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
      {showBuyerPopup && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={() => setShowBuyerPopup(false)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 text-center animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              🛒
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Marketplace</h2>
            <p className="text-gray-600 mb-6">
              The marketplace is exclusively for buyers. Please log in as a <strong>Buyer</strong> to explore crops and prices.
            </p>

            <button
              onClick={handleBuyerLoginRedirect}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 mb-3"
            >
              Login as Buyer
            </button>

            <button
              onClick={() => setShowBuyerPopup(false)}
              className="text-gray-400 hover:text-gray-600 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;