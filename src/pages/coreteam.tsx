import { motion } from 'framer-motion'
import Slideshow from '../components/slideshow/slideshow'
import CoreTeamCard from '../components/core-teamcard'
import MovieCredits from '../components/MovieCredits'

// Sample team members data - replace with actual data
const teamMembers = [
  { imageSrc: '/chill.jpg', title: 'Adithya SN', subtitle: 'President' },
  { imageSrc: '/chill.jpg', title: 'Adithya SN', subtitle: 'Vice President' },
  { imageSrc: '/chill.jpg', title: 'Adithya SN', subtitle: 'Secretary' },
  { imageSrc: '/chill.jpg', title: 'Adithya SN', subtitle: 'Treasurer' },
  { imageSrc: '/chill.jpg', title: 'Adithya SN', subtitle: 'Event Coordinator' },
  { imageSrc: '/chill.jpg', title: 'Adithya SN', subtitle: 'Tech Lead' },
  { imageSrc: '/chill.jpg', title: 'Adithya SN', subtitle: 'Tech Lead' },
];

export default function CoreTeamPage() {
  const teamImages = [
    '/temp_event_bg.png',
    '/temp_event_bg.png',
    '/temp_event_bg.png',
  ];

  // Credits data for other committees
const creditsData = [
  {
    title: 'Requirement Committee',
    members: Array(28).fill('Adithya S Nayak')
  },
  {
    title: 'Tech Team',
    members: Array(28).fill('Adithya S Nayak')
  },
  {
    title: 'Event Management',
    members: Array(28).fill('Adithya S Nayak')
  },
];

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');`}
      </style>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/temp_event_bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <section className="flex flex-col items-center w-full py-12 px-4">
        <Slideshow
          images={teamImages}
          autoplayDelay={4000}
        />

        {/* Animated Title - Fade Up */}
        <div className="relative pt-20 mt-4 flex flex-col items-center justify-center w-full">
          <motion.h1
            className="font-moco text-3xl sm:text-5xl sm:top-23 md:top-20 lg:top-13  top-26 text-center md:text-6xl absolute lg:text-8xl font-bold w-full mt-12 bg-gradient-to-b from-white via-white to-transparent bg-clip-text text-transparent tracking-wider"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.5
            }}
          >
            OUR CORE
          </motion.h1>

          {/* Team Members Grid */}
          <div className="flex flex-wrap relative z-20 gap-16 mt-16 w-full max-w-6xl justify-center">
            {teamMembers.map((member, index) => (
              <CoreTeamCard
                key={index}
                imageSrc={member.imageSrc}
                title={member.title}
                subtitle={member.subtitle}
              />
            ))}
          </div>
        </div>
        {/* movie credits section */}
      <div className="w-full mt-5">
          <MovieCredits sections={creditsData} />
        </div>
      </section>
    </>
  )
}
