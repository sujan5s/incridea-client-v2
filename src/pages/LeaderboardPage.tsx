import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import bgOp from '../assets/bg-op.png';
import LiquidGlassCard from '../components/liquidglass/LiquidGlassCard';

const LeaderboardPage = () => {
    // Mock data matching the specifications
    const leaderboardData = [
        { rank: 1, name: "Jolie Joie", username: "@joliejoie", followers: 15420, points: 7000, reward: 100000 },
        { rank: 2, name: "Brian Ngo", username: "@brianngo", followers: 14200, points: 2000, reward: 50000 },
        { rank: 3, name: "David Do", username: "@daviddo", followers: 13100, points: 2000, reward: 20000 },
        { rank: 4, name: "Henrions D'Connell", username: "@herri crts", followers: 12241, points: 2114424, reward: 1000 },
        { rank: 5, name: "Jeremiah Dooley", username: "@jeremiah", followers: 11500, points: 1845200, reward: 500 },
        { rank: 6, name: "Amelia Morar", username: "@amelia", followers: 10800, points: 1540320, reward: 250 },
        { rank: 7, name: "Victor Plains", username: "@victor", followers: 9200, points: 1203000, reward: 100 },
        { rank: 8, name: "Christina Soler", username: "@chris", followers: 8500, points: 1100200, reward: 50 },
    ];

    const topThree = leaderboardData.slice(0, 3);
    const rest = leaderboardData.slice(3);

    return (
        <>
            {/* Background - Dark space gradient with stars */}
            <div
                className="fixed inset-0 w-full h-full -z-50 bg-cover bg-center bg-no-repeat opacity-60"
                style={{ backgroundImage: `url(${bgOp})` }}
            />

            {/* Ambient Background Glows */}

            {/* Main Container - LiquidGlassCard as primary container */}
            <div className="min-h-screen relative font-sans flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
                <div className="w-full max-w-[95vw] relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <LiquidGlassCard className="p-8 md:p-12 !rounded-2xl sm:!rounded-[2.5rem] overflow-hidden border border-white/10">
                            <div className="space-y-8">

                                {/* 1. Navigation Tabs - Centered pill */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-center"
                                >
                                    <div className="inline-flex items-center gap-1 p-1.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                                        <button className="px-8 py-3 rounded-full bg-white text-gray-900 font-semibold transition-all text-sm">
                                            Quiz
                                        </button>
                                        <button className="px-8 py-3 rounded-full text-gray-400 hover:text-white transition-all text-sm">
                                            Leaderboard
                                        </button>
                                        <button className="px-8 py-3 rounded-full text-gray-400 hover:text-white transition-all text-sm">
                                            Task
                                        </button>
                                    </div>
                                </motion.div>

                                {/* 2. Prize Podium Section - 3 cards */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end justify-items-center px-4"
                                >
                                    {/* Left Card - 2nd Place (Silver) */}
                                    <PodiumCard
                                        player={topThree[1]}
                                        tier="silver"
                                        delay={0.3}
                                    />

                                    {/* Center Card - 1st Place (Gold) - LARGER */}
                                    <PodiumCard
                                        player={topThree[0]}
                                        tier="gold"
                                        delay={0.1}
                                        isCenter
                                    />

                                    {/* Right Card - 3rd Place (Bronze) */}
                                    <PodiumCard
                                        player={topThree[2]}
                                        tier="bronze"
                                        delay={0.5}
                                    />
                                </motion.div>

                                {/* Countdown below center card */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-center"
                                >
                                    <p className="text-gray-400 text-sm">
                                        Ends in <span className="text-white font-mono font-semibold">10d 23h 58m 23s</span>
                                    </p>
                                </motion.div>

                                {/* 3. Status Strip - Centered floating pill */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="flex justify-center px-4"
                                >
                                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                                        <span className="text-gray-300 text-sm">
                                            You earned{' '}
                                            <img
                                                src="/leaderboard/diamond-removebg-preview.png"
                                                alt="Diamond"
                                                className="w-4 h-4 inline-block mx-1"
                                            />
                                            <span className="text-cyan-400 font-bold">5</span> today and we ranked{' '}
                                            <span className="text-white font-bold">—</span> out of{' '}
                                            <span className="text-white font-bold">23141 users</span>
                                        </span>
                                    </div>
                                </motion.div>

                                {/* 4. Leaderboard Table */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="w-full space-y-3 px-4"
                                >
                                    {/* Table Header */}
                                    <div className="grid grid-cols-12 gap-4 px-6 py-3 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        <div className="col-span-1">Rank</div>
                                        <div className="col-span-4">User name</div>
                                        <div className="col-span-2 text-center hidden md:block">Followers</div>
                                        <div className="col-span-3 text-center hidden lg:block">Point</div>
                                        <div className="col-span-2 text-right">Reward</div>
                                    </div>

                                    {/* Table Rows */}
                                    <div className="space-y-2">
                                        {rest.map((player, index) => (
                                            <motion.div
                                                key={player.rank}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1 + index * 0.1 }}
                                                className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                                            >
                                                {/* Rank */}
                                                <div className="col-span-1 text-white font-bold text-lg">
                                                    {player.rank}
                                                </div>

                                                {/* User name with avatar */}
                                                <div className="col-span-4 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                                        {player.name.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-semibold text-sm">
                                                            {player.name}
                                                        </span>
                                                        <span className="text-gray-400 text-xs">
                                                            {player.username}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Followers */}
                                                <div className="col-span-2 text-center text-gray-300 font-medium hidden md:block">
                                                    {player.followers.toLocaleString()}
                                                </div>

                                                {/* Points */}
                                                <div className="col-span-3 text-center text-white font-mono font-semibold hidden lg:block">
                                                    {player.points.toLocaleString()}
                                                </div>

                                                {/* Reward */}
                                                <div className="col-span-2 flex items-center justify-end gap-2">
                                                    <img
                                                        src="/leaderboard/diamond-removebg-preview.png"
                                                        alt="Diamond"
                                                        className="w-5 h-5 object-contain"
                                                    />
                                                    <span className="text-cyan-400 font-bold">
                                                        {player.reward}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                            </div>
                        </LiquidGlassCard>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

interface Player {
    rank: number;
    name: string;
    username: string;
    followers: number;
    points: number;
    reward: number;
}

interface PodiumCardProps {
    player: Player;
    tier: 'gold' | 'silver' | 'bronze';
    delay: number;
    isCenter?: boolean;
}

const PodiumCard = ({ player, tier, delay, isCenter = false }: PodiumCardProps) => {
    // Trophy icons and colors based on tier
    const getTrophyIcon = () => {
        if (tier === 'gold') return '🏆';
        if (tier === 'silver') return '🥈';
        return '🥉';
    };

    const getTrophyColor = () => {
        if (tier === 'gold') return 'text-yellow-400';
        if (tier === 'silver') return 'text-gray-300';
        return 'text-orange-400';
    };

    const getGlowColor = () => {
        if (tier === 'gold') return 'shadow-[0_8px_32px_rgba(234,179,8,0.3)]';
        if (tier === 'silver') return 'shadow-[0_8px_32px_rgba(148,163,184,0.3)]';
        return 'shadow-[0_8px_32px_rgba(251,146,60,0.3)]';
    };

    // Center card is larger
    const cardSize = isCenter
        ? 'w-full max-w-[320px] h-[400px]'
        : 'w-full max-w-[280px] h-[340px]';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.6, type: 'spring' }}
            className={`${cardSize} relative`}
        >
            {/* Frosted glass card */}
            <div className={`
                w-full h-full
                bg-white/10 backdrop-blur-xl 
                border border-white/20 
                rounded-2xl 
                ${getGlowColor()}
                p-6
                flex flex-col items-center justify-between
                relative overflow-hidden
                hover:bg-white/15 transition-all duration-300
            `}>
                {/* Subtle highlight gradient at top */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center w-full space-y-4">
                    {/* Avatar */}
                    <div className={`${isCenter ? 'w-24 h-24' : 'w-20 h-20'} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl`}>
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`}
                            alt={player.name}
                            className="w-full h-full rounded-full"
                        />
                    </div>

                    {/* Name */}
                    <h3 className={`text-white font-bold text-center ${isCenter ? 'text-xl' : 'text-lg'}`}>
                        {player.name}
                    </h3>

                    {/* Trophy Icon */}
                    <div className={`${getTrophyColor()} ${isCenter ? 'text-5xl' : 'text-4xl'}`}>
                        <Trophy className={`${isCenter ? 'w-12 h-12' : 'w-10 h-10'} ${getTrophyColor()} fill-current`} />
                    </div>

                    {/* Points text */}
                    <p className="text-gray-300 text-sm">
                        Earn {player.points.toLocaleString()} points
                    </p>
                </div>

                {/* Prize section at bottom */}
                <div className="relative z-10 flex flex-col items-center space-y-2 w-full">
                    <div className="flex items-center gap-2">
                        <img
                            src="/leaderboard/diamond-removebg-preview.png"
                            alt="Diamond"
                            className={`${isCenter ? 'w-8 h-8' : 'w-6 h-6'} object-contain`}
                        />
                        <span className={`text-white font-bold font-mono ${isCenter ? 'text-4xl' : 'text-3xl'}`}>
                            {player.reward.toLocaleString()}
                        </span>
                    </div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider">
                        {tier === 'bronze' ? 'Price' : 'Prize'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default LeaderboardPage;
