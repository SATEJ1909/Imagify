import { useState, useContext, type FormEvent } from 'react';
import assets from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext, type AppContextValue } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const STYLES = [
    { id: 'realistic', label: 'Realistic', icon: '📷', color: 'from-blue-500 to-cyan-500' },
    { id: 'anime', label: 'Anime', icon: '🎌', color: 'from-pink-500 to-rose-500' },
    { id: 'painting', label: 'Painting', icon: '🎨', color: 'from-amber-500 to-orange-500' },
    { id: '3d', label: '3D Render', icon: '🧊', color: 'from-purple-500 to-indigo-500' },
] as const;

const ASPECT_RATIOS = [
    { id: '1:1', label: 'Square', icon: '⬜', width: 40, height: 40 },
    { id: '16:9', label: 'Landscape', icon: '🖼️', width: 48, height: 27 },
    { id: '9:16', label: 'Portrait', icon: '📱', width: 27, height: 48 },
] as const;

const EXAMPLE_PROMPTS = [
    'A futuristic city at night with neon lights reflecting on wet streets',
    'A serene Japanese garden with cherry blossoms and a koi pond',
    'An astronaut riding a horse on Mars, digital art',
    'A cozy coffee shop interior with warm lighting and plants',
];

type StyleType = (typeof STYLES)[number]['id'];
type AspectRatioType = (typeof ASPECT_RATIOS)[number]['id'];

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [style, setStyle] = useState<StyleType>('realistic');
    const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('1:1');

    const { generateImage, user, setShowLogin, credit } = useContext(AppContext) as AppContextValue;
    const navigate = useNavigate();

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            setShowLogin(true);
            return;
        }

        if (!input.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        if (credit < 1) {
            toast.error('Insufficient credits');
            navigate('/buy');
            return;
        }

        setLoading(true);

        try {
            const generatedImage = await generateImage(input, { style, aspectRatio });
            if (generatedImage) {
                setImage(generatedImage);
                setIsImageLoaded(true);
                toast.success('Image generated successfully!');
            }
        } catch (error) {
            console.error('Generation error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setIsImageLoaded(false);
        setImage(assets.sample_img_1);
        setInput('');
    };

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-[80vh] py-12"
        >
            {/* Header */}
            <div className="text-center mb-12">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full mb-4"
                >
                    ✨ AI Image Generator
                </motion.span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {isImageLoaded ? (
                        'Your creation is ready!'
                    ) : (
                        <>
                            Bring your{' '}
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                imagination
                            </span>{' '}
                            to life
                        </>
                    )}
                </h1>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Image Preview Card */}
                <motion.div
                    layout
                    className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-neutral-100 dark:border-neutral-700"
                >
                    {/* Gradient border on hover */}
                    <div className="absolute -inset-px bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl opacity-0 hover:opacity-50 transition-opacity -z-10 blur-sm" />

                    <div className="p-6">
                        <div className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-slate-900">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={image}
                                    src={image}
                                    alt="Generated"
                                    className="w-full object-contain"
                                    style={{
                                        aspectRatio: isImageLoaded ? aspectRatio.replace(':', '/') : '1/1',
                                        maxHeight: '500px',
                                    }}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>

                            {/* Loading overlay */}
                            <AnimatePresence>
                                {loading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
                                    >
                                        <div className="relative">
                                            <div className="w-16 h-16 border-4 border-white/20 rounded-full" />
                                            <div className="absolute inset-0 w-16 h-16 border-4 border-t-white rounded-full animate-spin" />
                                        </div>
                                        <p className="text-white mt-4 font-medium">Creating your masterpiece...</p>
                                        <p className="text-white/60 text-sm mt-1">This usually takes 5-10 seconds</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {isImageLoaded && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-neutral-600 dark:text-neutral-400 mt-4 text-center line-clamp-2"
                            >
                                <span className="font-medium text-neutral-800 dark:text-neutral-200">Prompt:</span>{' '}
                                "{input}"
                            </motion.p>
                        )}
                    </div>
                </motion.div>

                {/* Controls */}
                <AnimatePresence mode="wait">
                    {!isImageLoaded ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={onSubmitHandler}
                            className="mt-8 space-y-6"
                        >
                            {/* Prompt Input */}
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-sm opacity-20" />
                                <div className="relative flex bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-neutral-100 dark:border-neutral-700 overflow-hidden">
                                    <input
                                        onChange={(e) => setInput(e.target.value)}
                                        value={input}
                                        type="text"
                                        placeholder="Describe the image you want to create..."
                                        className="flex-1 bg-transparent px-6 py-4 text-lg focus:outline-none"
                                        disabled={loading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading || !input.trim()}
                                        className="m-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition shadow-lg shadow-purple-500/25"
                                    >
                                        {loading ? 'Generating...' : 'Generate'}
                                    </button>
                                </div>
                            </div>

                            {/* Style Selection */}
                            <div>
                                <label className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 block font-medium">
                                    Style
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {STYLES.map((s) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => setStyle(s.id)}
                                            className={`group flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all ${style === s.id
                                                    ? `bg-gradient-to-r ${s.color} text-white border-transparent shadow-lg`
                                                    : 'bg-white dark:bg-slate-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                                                }`}
                                        >
                                            <span className="text-xl">{s.icon}</span>
                                            <span className="font-medium">{s.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Aspect Ratio Selection */}
                            <div>
                                <label className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 block font-medium">
                                    Aspect Ratio
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {ASPECT_RATIOS.map((ar) => (
                                        <button
                                            key={ar.id}
                                            type="button"
                                            onClick={() => setAspectRatio(ar.id)}
                                            className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${aspectRatio === ar.id
                                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg'
                                                    : 'bg-white dark:bg-slate-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                                                }`}
                                        >
                                            <div
                                                className={`border-2 rounded ${aspectRatio === ar.id ? 'border-white' : 'border-neutral-400'
                                                    }`}
                                                style={{ width: ar.width / 2, height: ar.height / 2 }}
                                            />
                                            <span className="font-medium">{ar.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Example Prompts */}
                            <div>
                                <label className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 block font-medium">
                                    Try these prompts
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {EXAMPLE_PROMPTS.map((prompt) => (
                                        <button
                                            key={prompt}
                                            type="button"
                                            onClick={() => setInput(prompt)}
                                            className="text-sm px-4 py-2 bg-neutral-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 rounded-full transition-all"
                                        >
                                            {prompt.length > 40 ? prompt.slice(0, 40) + '...' : prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex gap-4 flex-wrap justify-center mt-8"
                        >
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium rounded-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Generate Another</span>
                            </button>
                            <a
                                href={image}
                                download="imaginetix-creation.png"
                                className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:opacity-90 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>Download</span>
                            </a>
                            <button
                                onClick={() => navigate('/gallery')}
                                className="flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium rounded-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>View Gallery</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Result;