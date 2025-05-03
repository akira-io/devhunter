import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { Loader2, PlusCircleIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function CreateHunt() {
    const { errors, processing, post, data, setData, reset } = useForm({
        content: '',
    });

    const { toast } = useToast();

    const [imagePreview, setImagePreview] = useState<string[]>([]);

    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     if (files) {
    //         const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
    //         setImagePreview((prev) => [...prev, ...fileArray]);
    //     }
    // };

    const shareHunt = (e: FormEvent) => {
        e.preventDefault();
        post(route('hunts.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    description: 'Hunt partilhada com sucesso.',
                });
                reset();
                setImagePreview([]);
            },
        });
    };

    return (
        <Card className="effect gradient mx-auto w-full max-w-xl">
            <CardContent className="flex items-start gap-4">
                <form className="relative flex w-full flex-col" onSubmit={shareHunt}>
                    <textarea
                        name="content"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        rows={3}
                        maxLength={500}
                        placeholder="Escreva algo interessante…"
                        className="w-full border-none p-3 ring-0 outline-none focus:border-none focus:ring-0 focus:outline-none focus-visible:outline-none"
                    />
                    <span className="text-right text-sm text-gray-500">{data.content.length}/500</span>
                    <InputError message={errors.content} />
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
                        <div className="flex-1" />
                        {/*<div className="flex items-center gap-3 text-gray-500">*/}
                        {/*    <input type="file" accept="image/*" multiple id="image-upload" className="hidden" onChange={handleImageChange} />*/}
                        {/*    <label htmlFor="image-upload" className="cursor-pointer text-xl">*/}
                        {/*        <ImageIcon className="h-5 w-5" />*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        <Button
                            type="submit"
                            disabled={processing || data.content.trim().length === 0}
                            className="disabled:bg-foreground-muted transition-all duration-300"
                        >
                            {processing ? <Loader2 className="animate-spin" size={16} /> : <PlusCircleIcon size={16} />}
                            Partilhar Hunt
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
