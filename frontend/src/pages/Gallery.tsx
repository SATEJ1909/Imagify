import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext, type AppContextValue } from '../context/AppContext';

interface ImageItem {
    _id: string;
    prompt: string;
    imageUrl: string;
    createdAt: string;
    style: string;
    aspectRatio: string;
    isPublic: boolean;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasMore: boolean;
}

const Gallery = () => {
    const { backendUrl, token, user } = useContext(AppContext) as AppContextValue;
    const navigate = useNavigate();

    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        fetchImages();
    }, [token]);

    const fetchImages = async (page = 1) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/v1/image/history`, {
                params: { page, limit: 12 },
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setImages(data.images);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Fetch images error:', error);
            toast.error('Failed to load images');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            setDeleting(imageId);
            const { data } = await axios.delete(`${backendUrl}/api/v1/image/${imageId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setImages(images.filter((img) => img._id !== imageId));
                setSelectedImage(null);
                toast.success('Image deleted');
            }
        } catch (error) {
            console.error('Delete image error:', error);
            toast.error('Failed to delete image');
        } finally {
            setDeleting(null);
        }
    };

    const handleTogglePublic = async (imageId: string) => {
        try {
            const { data } = await axios.patch(
                `${backendUrl}/api/v1/image/${imageId}/toggle-public`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                setImages(images.map((img) =>
                    img._id === imageId ? { ...img, isPublic: data.isPublic } : img
                ));
                if (selectedImage?._id === imageId) {
                    setSelectedImage({ ...selectedImage, isPublic: data.isPublic });
                }
                toast.success(data.message);
            }
        } catch (error) {
            console.error('Toggle public error:', error);
            toast.error('Failed to update image');
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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-semibold">Your Creations</h1>
                    <p className="text-neutral-600 mt-1">
                        {pagination?.total || 0} image{pagination?.total !== 1 ? 's' : ''} generated
                    </p>
                </div>
                <button
                    onClick={() => navigate('/result')}
                    className="bg-black text-white px-6 py-2.5 rounded-full hover:opacity-90 transition"
                >
                    Generate New
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square bg-neutral-200 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-neutral-600 mb-6 text-lg">No images yet</p>
                    <button
                        onClick={() => navigate('/result')}
                        className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition"
                    >
                        Generate your first image
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((img) => (
                            <motion.div
                                key={img._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.02 }}
                                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img.imageUrl}
                                    alt={img.prompt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                    <p className="text-white text-sm line-clamp-2 font-medium">
                                        {img.prompt}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-white/70 text-xs">{img.style}</span>
                                        {img.isPublic && (
                                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                                Public
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.pages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                                (pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => fetchImages(pageNum)}
                                        className={`w-10 h-10 rounded-full transition ${pageNum === pagination.page
                                                ? 'bg-black text-white'
                                                : 'bg-neutral-100 hover:bg-neutral-200'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                )
                            )}
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
                                    <span className="capitalize">{selectedImage.style}</span>
                                    <span>•</span>
                                    <span>{selectedImage.aspectRatio}</span>
                                    <span>•</span>
                                    <span>{formatDate(selectedImage.createdAt)}</span>
                                    {selectedImage.isPublic && (
                                        <>
                                            <span>•</span>
                                            <span className="text-blue-500">Public</span>
                                        </>
                                    )}
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
                                        onClick={() => handleTogglePublic(selectedImage._id)}
                                        className="border px-6 py-2.5 rounded-full hover:bg-neutral-100 transition"
                                    >
                                        {selectedImage.isPublic ? 'Make Private' : 'Share Publicly'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteImage(selectedImage._id)}
                                        disabled={deleting === selectedImage._id}
                                        className="border border-red-200 text-red-600 px-6 py-2.5 rounded-full hover:bg-red-50 transition disabled:opacity-50"
                                    >
                                        {deleting === selectedImage._id ? 'Deleting...' : 'Delete'}
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

export default Gallery;
