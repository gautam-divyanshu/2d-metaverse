import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
}

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch available avatars
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/avatars');
        const data = await response.json();
        if (response.ok) {
          setAvatars(data.avatars);
          if (data.avatars.length > 0) {
            setSelectedAvatar(data.avatars[0].id.toString());
          }
        }
      } catch (err) {
        console.error('Failed to fetch avatars:', err);
      }
    };
    fetchAvatars();
  }, []);

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          type: 'user', // Default to regular user
          ...(selectedAvatar && { avatarId: selectedAvatar }), // Only include if avatar is selected
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto sign-in after successful signup
        const signinResponse = await fetch(
          'http://localhost:3000/api/v1/auth/signup',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
            }),
          }
        );

        const signinData = await signinResponse.json();

        if (signinResponse.ok) {
          localStorage.setItem('token', signinData.token);
          localStorage.setItem(
            'user',
            JSON.stringify(signinData.user || { username: formData.username })
          );
          navigate('/dashboard');
        } else {
          // If auto-signin fails, redirect to signin page
          navigate('/signin');
        }
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden p-6">
      {/* Animated background blobs (same as SignIn) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-[blob_7s_infinite]" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-[blob_7s_infinite_2s]" />
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-[blob_7s_infinite_4s]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="backdrop-blur-xl bg-blue-950/40 border border-white/10 shadow-2xl rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-2">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">
                Join MetaVerse
              </span>
            </div>
            <p className="text-white/70 mt-2">
              Create your account and start exploring
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6"
            >
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-white/80 text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:bg-white/15 focus:border-cyan-400 focus:outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white/80 text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:bg-white/15 focus:border-cyan-400 focus:outline-none transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-white/80 text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:bg-white/15 focus:border-cyan-400 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Avatar Selection */}
            {avatars.length > 0 && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Choose Your Avatar
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {avatars.slice(0, 8).map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.id.toString())}
                      className={`
                        relative p-2 rounded-lg border-2 transition-all duration-200
                        ${
                          selectedAvatar === avatar.id.toString()
                            ? 'border-blue-400 bg-blue-500/20'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }
                      `}
                    >
                      <img
                        src={avatar.imageUrl}
                        alt={avatar.name}
                        className="w-full h-12 object-cover rounded"
                      />
                      <p className="text-xs text-white/70 mt-1 truncate">
                        {avatar.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center font-semibold text-white rounded-lg py-2.5 transition-all duration-300 shadow-lg ${
                isLoading
                  ? 'bg-gradient-to-r from-blue-600 to-blue-400 opacity-70 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/70 mt-8">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-blue-400 hover:text-blue-500 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
