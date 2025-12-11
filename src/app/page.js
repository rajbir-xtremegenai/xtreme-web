import Features from './components/Features';
import HeadImg from './components/HeadImg';
import Hero from './components/Hero';
import Usecase from './components/Usecase';
import Footer from './components/Footer';
import Cta from './components/Cta';
import WhyUs from './components/WhyUs';
import Blogs from './components/Blogs';
import BrandScroller from './components/BrandScroller';
import Navbar from './components/Navbar'; // Importing Navbar to use here since I didn't put it in layout yet.

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_5%,transparent_5%)] bg-[length:25px_25px]"></div>
      <div className="main" id='main'>
        <Hero />
        <HeadImg />
      </div>
      <div className="brands">
        <BrandScroller/>
      </div>
      <div id="features"></div>
      <Features />
      <div id="usecase"></div>
      <Usecase />
      <div id="whyus"></div>
      <WhyUs/>
      <div id="contact"></div>
      <Cta/>
      <div id="blogs"></div>
      <Blogs/>
      <Footer/>

      {/* Human/Author Credit - sticking to 100% design fidelity based on CSS provided */}
      <div className="human">
         <button>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            Xtreme Gen AI
         </button>
      </div>
    </>
  );
}
