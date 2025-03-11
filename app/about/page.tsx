import Image from 'next/image';
import Link from 'next/link';

const founders = [
  {
    name: 'Jagrat',
    role: 'Frontend Developer',
    image: '/founder1.jpg',
    description:
      'Jagrat crafts intuitive and visually appealing user interfaces, ensuring a seamless experience for every visitor. His attention to detail brings the platform to life.',
  },
  {
    name: 'Akshat',
    role: 'DBA',
    image: '/founder2.jpg',
    description:
      'Akshat ensures data integrity and efficiency, optimizing databases for fast, reliable access while maintaining top-notch security.',
  },
  {
    name: 'Shambhavi',
    role: 'Backend Developer',
    image: '/founder3.jpg',
    description:
      'Shambhavi powers the engine behind the scenes, building secure, efficient APIs and ensuring smooth server-side operations.',
  },
  {
    name: 'Durga',
    role: 'Backend Developer',
    image: '/founder4.jpg',
    description:
      'Durga focuses on performance and reliability, developing scalable backend systems that handle complex workflows effortlessly.',
  },
  {
    name: 'Saumyajit',
    role: 'DBA',
    image: '/founder5.jpg',
    description:
      'Saumyajit specializes in data organization and performance tuning, ensuring seamless interaction between the platform and its data.',
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center z-20">
        <Link href="/user" className="flex items-center">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.jpg" />
          </div>
        </Link>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Info */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">About Rent A Car</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Rent A Car was founded with a simple vision: to make vehicle rentals
            easy, affordable, and accessible for everyone. Whether you&apos;re
            planning a weekend getaway, need a daily commute solution, or
            exploring new destinations, we&apos;ve got you covered.
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform connects users with a wide range of vehicles, from
            budget-friendly options to premium rides, ensuring you find the
            perfect fit for your journey. Backed by cutting-edge technology and a
            passion for excellence, we prioritize your safety, comfort, and
            satisfaction.
          </p>
        </div>

        {/* Founders Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Meet Our Founders
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {founders.map((founder) => (
              <div key={founder.name} className="bg-white shadow-lg rounded-xl overflow-hidden">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={400}
                  height={300}
                  className="object-cover h-40 w-full"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{founder.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{founder.role}</p>
                  <p className="text-sm text-gray-700">{founder.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
