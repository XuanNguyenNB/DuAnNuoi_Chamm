import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatusBoard from './components/StatusBoard';
import GoalProgress from './components/GoalProgress';
import DonationMenu from './components/DonationMenu';
import DonationModal from './components/DonationModal';
import HallOfFame from './components/HallOfFame';
import Footer from './components/Footer';
import { packages, DonationPackage } from './data/packages';
import { currentGoal, getCurrentMood } from './data/config';
import { useDonations } from './hooks/useDonations';

function App() {
    const [selectedPackage, setSelectedPackage] = useState<DonationPackage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { donations, totalDonated, hungerLevel, addDonation } = useDonations();
    const currentMood = getCurrentMood(hungerLevel);

    const handleSelectPackage = (pkg: DonationPackage) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const handleConfirmDonation = (amount: number, message: string) => {
        if (selectedPackage) {
            addDonation(selectedPackage, amount, message);
        }
    };

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                <HeroSection mood={currentMood} />

                <StatusBoard
                    mood={currentMood}
                    hungerLevel={hungerLevel}
                />

                <GoalProgress
                    goal={currentGoal}
                    totalDonated={totalDonated}
                />

                <DonationMenu
                    packages={packages}
                    onSelectPackage={handleSelectPackage}
                />

                <HallOfFame donations={donations} />
            </main>

            <Footer />

            <DonationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                package={selectedPackage}
                onConfirmDonation={handleConfirmDonation}
            />
        </div>
    );
}

export default App;
