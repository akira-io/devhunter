import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useTweetStore } from '@/stores/tweet';
import { ImageIcon, Plus } from 'lucide-react';
import { useState } from 'react';

export function FloatingCreatePost() {
    const { isFloatCreateTweetOpen, setIsFloatCreateTweetOpen } = useTweetStore();
    const [tweetContent, setTweetContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
            setImagePreview((prev) => [...prev, ...fileArray]);
        }
    };

    const handleTweetPost = () => {
        if (!tweetContent.trim()) return;
        setTweetContent('');
        setImagePreview([]);
        setIsFloatCreateTweetOpen(false);
    };

    const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweetContent(e.target.value);
    };

    return (
        <div className="fixed right-4 bottom-4 z-50 md:right-10 md:bottom-10">
            <Dialog open={isFloatCreateTweetOpen} onOpenChange={setIsFloatCreateTweetOpen}>
                <DialogTrigger className="bg-primary hover:bg-primary-dark flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300">
                    <Plus size={24} />
                </DialogTrigger>
                <DialogContent className="w-full max-w-md">
                    <div className="mt-6 flex w-full flex-col">
                        <textarea
                            value={tweetContent}
                            onChange={handleTweetChange}
                            rows={10}
                            placeholder="Escreva algo interessante…"
                            className="w-full border-none p-3 text-sm ring-0 outline-none focus:border-none focus:ring-0 focus:outline-none focus-visible:outline-none"
                        />
                        {imagePreview && (
                            <div className="mt-2 flex grid grid-cols-2 gap-2 md:grid-cols-4">
                                {imagePreview.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Preview ${index}`}
                                        className="effect max-h-60 w-full rounded-xl border-2 object-cover shadow-lg transition-all duration-300 hover:scale-105"
                                    />
                                ))}
                            </div>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-gray-500">
                                <input type="file" accept="image/*" multiple id="image-upload" className="hidden" onChange={handleImageChange} />
                                <label htmlFor="image-upload" className="cursor-pointer text-xl">
                                    <ImageIcon className="h-5 w-5" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsFloatCreateTweetOpen(false)} className="mr-2">
                            Cancelar
                        </Button>
                        <Button onClick={handleTweetPost} disabled={!tweetContent.trim()}>
                            Criar Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
