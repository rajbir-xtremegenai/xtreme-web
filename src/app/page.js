import Features from './components/Features';
import HeadImg from './components/HeadImg';
import Hero from './components/Hero'
import Usecase from './components/Usecase';
import Footer from './components/Footer';
import Cta from './components/Cta';
import WhyUs from './components/WhyUs';
import Blogs from './components/Blogs';
import BrandScroller from './components/BrandScroller';

export default function Home() {
  return (
    <main className="relative bg-[var(--color-bg-dark)] text-white overflow-hidden selection:bg-[var(--color-clr1)] selection:text-white">

      <div className="relative w-full min-h-screen flex items-center justify-center pt-24 md:pt-0 z-0" id='main'>
        <Hero />
        <HeadImg />
      </div>

      <div className="w-full relative z-10 bg-[var(--color-bg-dark)]">
        <div className="brands py-8">
          <BrandScroller/>
        </div>

        <div id="features" className="scroll-mt-24"></div>
        <Features />

        <div id="usecase" className="scroll-mt-24"></div>
        <Usecase />

        <div id="whyus" className="scroll-mt-24"></div>
        <WhyUs/>

        <div id="contact" className="scroll-mt-24"></div>
        <Cta/>

        <div id="blogs" className="scroll-mt-24"></div>
        <Blogs/>

        <Footer/>
      </div>
    </main>
  );
}
