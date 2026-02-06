import { motion } from 'framer-motion';

interface CreditsSection {
    title: string;
    members: string[];
}

interface MovieCreditsProps {
    sections: CreditsSection[];
}

const MovieCredits: React.FC<MovieCreditsProps> = ({ sections }) => {
    return (
        <div className="relative w-full py-2 px-2 sm:px-4">
            {/* Credits Container */}
            <div className="w-full space-y-12 sm:space-y-16">
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        {/* Section Title */}
                        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-5 tracking-wider sm:tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-moco">
                            {section.title}
                        </h2>

                        {/* Names Grid - Responsive columns */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-0 gap-y-3 sm:gap-y-4 max-w-4xl mx-auto">
                            {section.members.map((name, nameIndex) => (
                                <motion.div
                                    key={nameIndex}
                                    className="text-center text-white text-sm sm:text-base md:text-lg font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-moco"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: nameIndex * 0.02 }}
                                >
                                    {name}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCredits;
