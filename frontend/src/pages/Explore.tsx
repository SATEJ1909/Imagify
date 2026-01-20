import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

interface PublicImage {
    _id: string;
    prompt: string;
    imageUrl: string;
    createdAt: string;
    style: string;
    aspectRatio: string;
    likes: number;
    userId?: {
        name: string;
    };
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasMore: boolean;
}

const Explore = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

    const [images, setImages] = useState<PublicImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<PublicImage | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async (page = 1) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/v1/image/explore`, {
                params: { page, limit: 20 },
            });

            if (data.success) {
                setImages(data.images);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Fetch images error:', error);
            toast.error('Failed to load community gallery');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-[80vh] py-12"
        >
            <div className="text-center mb-12">
                <h1 className="text-4xl font-semibold">Explore Community Creations</h1>
                <p className="text-neutral-600 mt-3 text-lg">
                    Discover amazing AI-generated images shared by our community
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square bg-neutral-200 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🌍</div>
                    <p className="text-neutral-600 text-lg">
                        No public images yet. Be the first to share!
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <motion.div
                                key={img._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all"
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img.imageUrl}
                                    alt={img.prompt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                    <p className="text-white text-sm line-clamp-2 font-medium">
                                        {img.prompt}
                                    </p>
                                    {img.userId?.name && (
                                        <p className="text-white/70 text-xs mt-1">
                                            by {img.userId.name}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.pages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            <button
                                onClick={() => fetchImages(pagination.page - 1)}
                                disabled={pagination.page === 1}
                                className="px-4 py-2 rounded-full border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 transition"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">
                                Page {pagination.page} of {pagination.pages}
                            </span>
                            <button
                                onClick={() => fetchImages(pagination.page + 1)}
                                disabled={!pagination.hasMore}
                                className="px-4 py-2 rounded-full border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <img
                                    src={selectedImage.imageUrl}
                                    alt={selectedImage.prompt}
                                    className="w-full max-h-[60vh] object-contain bg-neutral-100"
                                />
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6">
                                <p className="text-neutral-800 text-lg">{selectedImage.prompt}</p>

                                <div className="flex items-center gap-4 mt-3 text-sm text-neutral-500">
                                    {selectedImage.userId?.name && (
                                        <>
                                            <span>by {selectedImage.userId.name}</span>
                                            <span>•</span>
                                        </>
                                    )}
                                    <span className="capitalize">{selectedImage.style}</span>
                                    <span>•</span>
                                    <span>{selectedImage.aspectRatio}</span>
                                    <span>•</span>
                                    <span>{formatDate(selectedImage.createdAt)}</span>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-6">
                                    <a
                                        href={selectedImage.imageUrl}
                                        download={`imaginetix-${selectedImage._id}.png`}
                                        className="bg-black text-white px-6 py-2.5 rounded-full hover:opacity-90 transition"
                                    >
                                        Download
                                    </a>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(selectedImage.prompt);
                                            toast.success('Prompt copied to clipboard!');
                                        }}
                                        className="border px-6 py-2.5 rounded-full hover:bg-neutral-100 transition"
                                    >
                                        Copy Prompt
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Explore;
