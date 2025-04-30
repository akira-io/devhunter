import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function CreateTweet() {
    const [tweetContent, setTweetContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isPosting, setIsPosting] = useState(false);

    const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweetContent(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTweetPost = () => {
        if (!tweetContent.trim()) return;

        setIsPosting(true);
        setTimeout(() => {
            console.log('Tweet posted:', tweetContent);
            setTweetContent('');
            setImagePreview(null);
            setIsPosting(false);
        }, 1500);
    };

    return (
        <Card className="effect gradient mx-auto w-full max-w-xl">
            <CardContent className="flex items-start gap-4">
                <div className="flex w-full flex-col">
                    <Textarea
                        value={tweetContent}
                        onChange={handleTweetChange}
                        rows={3}
                        placeholder="Escreva algo interessante…"
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img src={imagePreview} alt="Preview" className="max-h-60 w-full rounded-lg object-cover" />
                        </div>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-500">
                            <input type="file" accept="image/*" id="image-upload" className="hidden" onChange={handleImageChange} />
                            <label htmlFor="image-upload" className="cursor-pointer text-xl">
                                <ImageIcon className="h-5 w-5" />
                            </label>
                        </div>
                        <Button
                            onClick={handleTweetPost}
                            disabled={isPosting || !tweetContent.trim()}
                            className="transition-all duration-300 disabled:bg-gray-400"
                        >
                            {isPosting && <Loader2 className="animate-spin" size={16} />}
                            Criar Post
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
