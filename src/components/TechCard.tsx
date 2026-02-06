import Glass from "./liquidglass/LiquidGlassCard";

interface TechCardProps {
    image: string;
    name: string;
    quote?: string;
    socials?: {
        linkedin?: string;
        instagram?: string;
        github?: string;
    };
}

function TechCard({ image, name, quote, socials }: TechCardProps) {
    return (
        <div className="relative w-[250px] h-[380px] rounded-3xl overflow-hidden bg-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
            />

            <div
                className="
            absolute bottom-0 left-0 w-full h-[60%]
            flex flex-col justify-end p-6 text-white
            bg-linear-to-b
            from-[rgba(47,24,94,0,0.2)]
            via-[#2c106496]
            to-[rgb(66,40,118)]
          "
            >
                <h2 className="text-2xl font-bold mb-2 font-moco">{name}</h2>

                {quote && (
                    <p className="text-[15px] leading-snug text-gray-200 mb-6 font-moco">
                        {quote}
                    </p>
                )}

                <div className="flex justify-end gap-2">
                    {socials?.linkedin && (
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                            <Glass className="rounded-full !px-2 !py-2  flex justify-center items-center cursor-target">
                                <svg stroke="White" fill="White" stroke-width="0" className="p-0.5" viewBox="0 0 448 512" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
                            </Glass>
                        </a>
                    )}
                    {socials?.instagram && (
                        <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
                            <Glass className="rounded-full !p-2 !py-1 hover:animate-pulse flex justify-center items-center cursor-target">
                                <svg stroke="White" fill="white" stroke-width="0" viewBox="0 0 448 512" height="32" className="p-0.5" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                            </Glass>
                        </a>
                    )}
                    {socials?.github && (
                        <a href={socials.github} target="_blank" rel="noopener noreferrer">
                            <Glass className="rounded-full !p-2 !py-1 hover:animate-pulse flex justify-center items-center cursor-target">
                                <svg height="32" stroke="White" fill="White" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="22" data-view-component="true" className="p-0.5">
                                    <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
                                </svg>
                            </Glass>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TechCard;