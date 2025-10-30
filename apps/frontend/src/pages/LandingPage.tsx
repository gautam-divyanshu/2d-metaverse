import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Globe, Zap, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-['Helvetica',_sans-serif] overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-lg border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-[#06D6A0]" />
            <span className="text-2xl font-bold">2D Metaverse</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/features"
              className="hover:text-[#06D6A0] transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="hover:text-[#06D6A0] transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#06D6A0] transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/signin"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-[#06D6A0] text-black font-semibold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(6,214,160,0.4)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative pt-40 pb-24 text-center"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#06D6A0]/5 to-transparent blur-3xl"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Your Virtual Workspace for{' '}
            <span className="text-[#06D6A0]">Instant Collaboration</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Bring your team together in a space that’s more than just a chat
            window. Engage, create, and innovate in a 2D world built for
            productivity.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4"
          >
            <Link
              to="/signup"
              className="bg-[#06D6A0] text-black font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(6,214,160,0.5)]"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Demo Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              {/* Placeholder for an interactive element or video */}
              <div className="bg-gray-800 flex items-center justify-center">
                <p className="text-gray-500">Interactive Demo Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-[#222222]/30"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-4"
            >
              Work Intelligently, Collaborate Instantly
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg">
              Forget scheduling and meeting links. Look around to find who’s
              free and start talking in seconds.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "See Who's Free",
                description:
                  'Instantly know who’s free, focused, or in meetings.',
              },
              {
                icon: Globe,
                title: 'Wave Them Over',
                description:
                  'A simple wave is all it takes to start a conversation.',
              },
              {
                icon: Zap,
                title: 'Join in a Click',
                description:
                  'No more waiting for invites. Jump into discussions instantly.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-[#06D6A0] hover:scale-105 transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 text-[#06D6A0] mb-5" />
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">2D Metaverse</h4>
              <p className="text-gray-400">&copy; 2025. All rights reserved.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-400 hover:text-white"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/updates"
                    className="text-gray-400 hover:text-white"
                  >
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
