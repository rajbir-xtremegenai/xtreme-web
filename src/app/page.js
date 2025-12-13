import Features from './components/Features';
import HeadImg from './components/HeadImg';
import Hero from './components/Hero'
import Usecase from './components/Usecase';
import IndustrySolutions from './components/IndustrySolutions';
import Cta from './components/Cta';
import WhyUs from './components/WhyUs';
import Blogs from './components/Blogs';
import BrandScroller from './components/BrandScroller';
import Partners from './components/Partners';

export const metadata = {
  title: "Call The Future Now: Human-Like AI Agents by Xtreme Gen AI",
  description: "Empowering 50+ brands to rapidly build & deploy 24/7, language-neutral, CRM-integrated voice AI agents. Low latency & interruption handling.",
  openGraph: {
    title: "Call The Future Now: Human-Like AI Agents by Xtreme Gen AI",
    description: "Empowering 50+ brands to rapidly build & deploy 24/7, language-neutral, CRM-integrated voice AI agents. Low latency & interruption handling.",
    url: "https://xtremegenai.com",
    type: "website",
  },
};


async function getHomeData() {
  //   return {
  //     "success": true,
  //     "message": "Home data fetched successfully.",
  //     "data": {
  //         "banners": [],
  //         "blogs": [
  //             {
  //                 "id": 4,
  //                 "slug": "slug1",
  //                 "title": "blog seo title",
  //                 "imageUrl": "blogs/i1-XtremeGenAI.png",
  //                 "altText": "image alt text here",
  //                 "author": "rajbir",
  //                 "updatedAt": "2025-12-13T05:44:01.469Z"
  //             }
  //         ],
  //         "phoneNumber": "92280 34172"
  //     }
  // }

  if (!process.env.NEXT_PUBLIC_API_BASE_URL || !process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error('Missing API environment variables: NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_API_KEY');
  }

  console.log('Fetching home data');
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/home`, {
      method: 'GET',
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_API_KEY,
        'Content-Type': 'application/json',
      },
      // next: { revalidate: 600 }, // ISR approach
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Error response body: ${errorBody}`);
      throw new Error(`Failed to fetch home data: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching home data:', error.message);
    return { success: false, message: error.message, data: { blogs: [] } };
  }
}

export default async function Home() {
  const homeData = await getHomeData();
  const blogs = homeData?.success && homeData?.data?.blogs ? homeData.data.blogs : [];

  return (
    <main className="relative bg-[var(--color-bg-dark)] text-white overflow-hidden selection:bg-[var(--color-clr1)] selection:text-white">

      <div className="relative w-full min-h-screen flex items-center justify-center pt-24 md:pt-0 z-0" id='main'>
        <Hero />
        <HeadImg />
      </div>

      <div className="w-full relative z-10 bg-[var(--color-bg-dark)]">
        <BrandScroller />

        <div id="usecase" className="scroll-mt-24"></div>
        <Usecase />

        <IndustrySolutions />

        <div id="partners" className="scroll-mt-24"></div>
        <Partners />

        <div id="features" className="scroll-mt-24"></div>
        <Features />

        <div id="whyus" className="scroll-mt-24"></div>
        <WhyUs />

        <div id="contact" className="scroll-mt-24"></div>
        <Cta />

        <div id="blogs" className="scroll-mt-24"></div>
        <Blogs blogs={blogs} />
      </div>
    </main>
  );
}
