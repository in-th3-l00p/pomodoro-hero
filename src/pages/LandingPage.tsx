import React from 'react';
import { Timer, Brain, BarChart3, Shield, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FeatureCard from '../components/FeatureCard';

const features = [
  {
    icon: <Timer className="w-8 h-8 text-indigo-600" />,
    title: "Smart Time Management",
    description: "Customize your work sessions with flexible Pomodoro intervals that adapt to your workflow."
  },
  {
    icon: <Brain className="w-8 h-8 text-indigo-600" />,
    title: "Focus Analytics",
    description: "Track your productivity patterns and receive insights to optimize your work-rest balance."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
    title: "Progress Tracking",
    description: "Visualize your productivity journey with detailed statistics and progress reports."
  },
  {
    icon: <Shield className="w-8 h-8 text-indigo-600" />,
    title: "Secure Sync",
    description: "Your progress is safely stored and synced across devices with secure authentication."
  },
  {
    icon: <Clock className="w-8 h-8 text-indigo-600" />,
    title: "Custom Sessions",
    description: "Create personalized time blocks that match your unique concentration patterns."
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-600" />,
    title: "Team Integration",
    description: "Connect with teammates and share productivity achievements in real-time."
  }
];

const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Master Your Time with</span>
                  <span className="block text-indigo-600">NextPomodoro</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Transform your productivity with our intelligent Pomodoro timer. 
                  Track your progress, sync across devices, and achieve more with 
                  focused work sessions.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {currentUser ? (
                    <div className="rounded-md shadow">
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Go to Dashboard
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-md shadow">
                        <button
                          onClick={() => navigate('/register')}
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          Get Started
                        </button>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <button
                          onClick={() => navigate('/login')}
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                        >
                          Sign In
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay focused
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Discover how NextPomodoro can help you achieve more with less stress.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;