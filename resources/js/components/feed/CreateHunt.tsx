import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon, Loader2, PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';

export function CreateHunt() {
    const [tweetContent, setTweetContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [isPosting, setIsPosting] = useState(false);

    const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweetContent(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
            setImagePreview((prev) => [...prev, ...fileArray]);
        }
    };

    const handleTweetPost = () => {
        if (!tweetContent.trim()) return;

        setIsPosting(true);
        setTimeout(() => {
            console.log('Tweet posted:', tweetContent);
            setTweetContent('');
            setImagePreview([]);
            setIsPosting(false);
        }, 1500);
    };

    return (
        <Card className="effect gradient mx-auto w-full max-w-xl">
            <CardContent className="flex items-start gap-4">
                <div className="relative flex w-full flex-col">
                    <textarea
                        value={tweetContent}
                        onChange={handleTweetChange}
                        rows={3}
                        placeholder="Escreva algo interessante…"
                        className="w-full border-none p-3 ring-0 outline-none focus:border-none focus:ring-0 focus:outline-none focus-visible:outline-none"
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
                        <Button
                            onClick={handleTweetPost}
                            disabled={isPosting || !tweetContent.trim()}
                            className="disabled:bg-foreground-muted transition-all duration-300"
                        >
                            {isPosting ? <Loader2 className="animate-spin" size={16} /> : <PlusCircleIcon size={16} />}
                            Partilhar Hunt
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
