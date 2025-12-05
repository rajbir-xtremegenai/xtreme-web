import Image from 'next/image';

const trustData = [
  {
    icon: '/ic_finance_offer.svg',
    title: 'Special Financing Offers',
    description: 'Our stress-free finance department that can find financial solutions to save you money.',
  },
  {
    icon: '/ic_car_dealership.svg',
    title: 'Trusted Car Dealership',
    description: 'Our stress-free finance department that can find financial solutions to save you money.',
  },
  {
    icon: '/ic_transparent.svg',
    title: 'Transparent Pricing',
    description: 'Our stress-free finance department that can find financial solutions to save you money.',
  },
  {
    icon: '/ic_expert_car.svg',
    title: 'Expert Car Service',
    description: 'Our stress-free finance department that can find financial solutions to save you money.',
  },
];

const Trust = () => {
  return (
    <section className="py-12 sm:py-10 lg:py-10">
      {/* <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"> */}
      <div className="text-center lg:text-left">
        <h4 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">Why Choose Us?</h4>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustData.map((item, index) => (
          <div key={index} className="p-6 transition-all duration-200 transform bg-white rounded-lg">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 rounded-full">
              <Image src={item.icon} alt={item.title} width={32} height={32} />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-center text-gray-900 font-pj">{item.title}</h3>
            <p className="mt-4 text-base text-center text-gray-600 font-pj">{item.description}</p>
          </div>
        ))}
      </div>
      {/* </div> */}
    </section>
  );
};

export default Trust;
