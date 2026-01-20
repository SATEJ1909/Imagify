import { useState, useContext, type FormEvent } from 'react';
import assets from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext, type AppContextValue } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const STYLES = [
    { id: 'realistic', label: 'Realistic', icon: '📷' },
    { id: 'anime', label: 'Anime', icon: '🎌' },
    { id: 'painting', label: 'Painting', icon: '🎨' },
    { id: '3d', label: '3D Render', icon: '🧊' },
] as const;

const ASPECT_RATIOS = [
    { id: '1:1', label: 'Square', icon: '⬜' },
    { id: '16:9', label: 'Landscape', icon: '🖼️' },
    { id: '9:16', label: 'Portrait', icon: '📱' },
] as const;

type StyleType = (typeof STYLES)[number]['id'];
type AspectRatioType = (typeof ASPECT_RATIOS)[number]['id'];

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [style, setStyle] = useState<StyleType>('realistic');
    const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('1:1');

    const { generateImage, user, setShowLogin } = useContext(AppContext) as AppContextValue;
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
        <motion.form
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmitHandler}
            className="min-h-[80vh] flex flex-col items-center justify-center py-12"
        >
            {/* Image Preview */}
            <div className="bg-white border rounded-2xl shadow-sm p-4 max-w-lg w-full">
                <div className="relative">
                    <img
                        src={image}
                        alt="Generated"
                        className="w-full rounded-xl"
                        style={{
                            aspectRatio: isImageLoaded ? aspectRatio.replace(':', '/') : '1/1',
                        }}
                    />
                    {loading && (
                        <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col items-center justify-center">
                            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                            <p className="text-white mt-4 text-sm">Creating your masterpiece...</p>
                        </div>
                    )}
                </div>
                {isImageLoaded && (
                    <p className="text-sm text-neutral-500 mt-3 text-center line-clamp-2">
                        "{input}"
                    </p>
                )}
            </div>

            {/* Controls */}
            {!isImageLoaded && (
                <div className="w-full max-w-xl mt-8 space-y-6">
                    {/* Prompt Input */}
                    <div className="flex w-full bg-white border text-sm p-1.5 rounded-full shadow-sm">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Describe what you want to create..."
                            className="flex-1 bg-transparent outline-none ml-4 text-base"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="bg-black text-white px-8 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
                        >
                            {loading ? 'Generating...' : 'Generate'}
                        </button>
                    </div>

                    {/* Style Selection */}
                    <div>
                        <label className="text-sm text-neutral-600 mb-2 block">Style</label>
                        <div className="flex flex-wrap gap-2">
                            {STYLES.map((s) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => setStyle(s.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${style === s.id
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white hover:bg-neutral-50 border-neutral-200'
                                        }`}
                                >
                                    <span>{s.icon}</span>
                                    <span className="text-sm">{s.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Aspect Ratio Selection */}
                    <div>
                        <label className="text-sm text-neutral-600 mb-2 block">Aspect Ratio</label>
                        <div className="flex flex-wrap gap-2">
                            {ASPECT_RATIOS.map((ar) => (
                                <button
                                    key={ar.id}
                                    type="button"
                                    onClick={() => setAspectRatio(ar.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${aspectRatio === ar.id
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white hover:bg-neutral-50 border-neutral-200'
                                        }`}
                                >
                                    <span>{ar.icon}</span>
                                    <span className="text-sm">{ar.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Example Prompts */}
                    <div>
                        <label className="text-sm text-neutral-600 mb-2 block">Try these prompts</label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'A futuristic city at night with neon lights',
                                'A serene mountain landscape at sunrise',
                                'A cute robot playing guitar',
                            ].map((prompt) => (
                                <button
                                    key={prompt}
                                    type="button"
                                    onClick={() => setInput(prompt)}
                                    className="text-xs px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full transition"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Post-Generation Actions */}
            {isImageLoaded && (
                <div className="flex gap-3 flex-wrap justify-center mt-8">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="border text-black px-8 py-3 rounded-full cursor-pointer hover:bg-neutral-100 transition"
                    >
                        Generate Another
                    </button>
                    <a
                        href={image}
                        download="imaginetix-creation.png"
                        className="bg-black text-white px-10 py-3 rounded-full cursor-pointer hover:opacity-90 transition inline-block"
                    >
                        Download
                    </a>
                    <button
                        type="button"
                        onClick={() => navigate('/gallery')}
                        className="border text-black px-8 py-3 rounded-full cursor-pointer hover:bg-neutral-100 transition"
                    >
                        View Gallery
                    </button>
                </div>
            )}
        </motion.form>
    );
};

export default Result;