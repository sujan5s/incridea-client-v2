import { motion } from 'framer-motion'
import TechCard from '../components/TechCard'

// Sample tech team members data
const people = [
  {
    image: '/chill.jpg',
    name: 'Tech Lead',
    role: 'Members',
    quote: 'Building the future one line at a time.',
    socials: { linkedin: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Head Dev',
    role: 'Members',
    quote: 'Making things look good.',
    socials: { instagram: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Co-Head Dev',
    role: 'Members',
    quote: 'Handling the heavy lifting.',
    socials: { linkedin: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Co-Head Dev',
    role: 'Members',
    quote: 'Handling the heavy lifting.',
    socials: { linkedin: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Co-Head Dev',
    role: 'Members',
    quote: 'Handling the heavy lifting.',
    socials: { linkedin: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'UI/UX Designer',
    role: 'Head',
    quote: 'Designing experiences.',
    socials: { instagram: '#', linkedin: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'DevOps',
    role: 'Co-Head',
    quote: 'Keeping it all running.',
    socials: { github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Full Stack',
    role:'Co-Head',
    quote: 'Jack of all trades.',
    socials: { linkedin: '#', instagram: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Full Stack',
    role:'Co-Head',
    quote: 'Jack of all trades.',
    socials: { linkedin: '#', instagram: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Full Stack',
    role:'Co-Head',
    quote: 'Jack of all trades.',
    socials: { linkedin: '#', instagram: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Full Stack',
    role:'Head',
    quote: 'Jack of all trades.',
    socials: { linkedin: '#', instagram: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Full Stack',
    role:'Head',
    quote: 'Jack of all trades.',
    socials: { linkedin: '#', instagram: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Full Stack',
    role:'Head',
    quote: 'Jack of all trades.',
    socials: { linkedin: '#', instagram: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Full Stack',
    role:'Co-Head',
    quote: 'Jack of all trades.',
    socials: { linkedin: '#', instagram: '#', github: '#' }
  },
  {
    image: '/chill.jpg',
    name: 'Full Stack',
    role:'Head',
    quote: 'Jack of all trades.',
    socials: { linkedin: '#', instagram: '#', github: '#' }
  },
];

export default function TechTeamPage() {
   

  // const uq=[...new Set(people.map(user => user.role))]

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');`}
      </style>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        >
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <section className="flex flex-col items-center w-full pt-0 sm:pt-2 md:pt-4 lg:pt-6 pb-12 px-4">
         
        {/* Members section */}
        <div className="relative pt-20 flex flex-col items-center justify-center w-full">
        {/* Animated Title - Fade Up */}
          <motion.h1
            className="font-moco text-3xl sm:text-5xl sm:top-13 md:top-11 lg:top-4  top-17 text-center md:text-6xl absolute lg:text-8xl font-bold w-full mt-12 bg-gradient-to-b from-white via-white to-transparent bg-clip-text text-transparent tracking-wider"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut", 
              delay: 0.5
            }}
          >
            TECH TEAM
            {/* MEMBERS */}
          </motion.h1>
          {/* Team Members Grid */}
          <div className="flex flex-wrap  relative z-20 gap-16 mt-16 w-full max-w-4xl justify-center">
            {/* {people.filter(member => member.role === "Full Stack").map((member, index) => ( */}
            {people.map((member, index) => (
              <TechCard
                key={index}
                image={member.image}
                name={member.name}
                quote={member.quote}
                socials={member.socials}
              />
            ))}
          </div>
        </div>
         
      </section>
    </>
  )
}
