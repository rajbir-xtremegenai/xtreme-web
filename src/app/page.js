import HeadImg from '@/components/HeadImg';
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen bg-black">
        <HeadImg />
        <Navbar />
        <main className="relative z-10">
          <Hero />
        </main>
      </div>
    </>
  );
}
