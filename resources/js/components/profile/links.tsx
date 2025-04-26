import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { RiBlueskyFill, RiGithubFill, RiLinkedinBoxFill, RiTwitterXFill, RiYoutubeFill } from '@remixicon/react';
import { Globe, PlusIcon, UserIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { PiNotePencilBold } from 'react-icons/pi';

export function ProfileLinks({ user }: { user: User }) {
    const { toast } = useToast();

    const { data, setData, patch, errors, processing } = useForm({
        github_url: user.github_url,
        twitter_url: user.twitter_url,
        youtube_url: user.youtube_url,
        linkedin_url: user.linkedin_url,
        bluesky_url: user.bluesky_url,
        website_url: user.website_url,
    });

    const Link: Record<string, keyof typeof data> = {
        GitHub: 'github_url',
        Twitter: 'twitter_url',
        YouTube: 'youtube_url',
        LinkedIn: 'linkedin_url',
        Bluesky: 'bluesky_url',
        Website: 'website_url',
    };
    const [openLinkDialog, setOpenLinkDialog] = useState(false);
    const links = [
        { name: 'GitHub', url: user.github_url, icon: <RiGithubFill />, placeholer: 'https://github.com/username' },
        { name: 'Twitter', url: user.twitter_url, icon: <RiTwitterXFill />, placeholer: 'https://x.com/username' },
        {
            name: 'YouTube',
            url: user.youtube_url,
            icon: <RiYoutubeFill />,
            placeholer: 'https://youtube.com/@username',
        },
        {
            name: 'LinkedIn',
            url: user.linkedin_url,
            icon: <RiLinkedinBoxFill />,
            placeholer: 'https://linkedin.com/in/username',
        },
        {
            name: 'Bluesky',
            url: user.bluesky_url,
            icon: <RiBlueskyFill />,
            placeholer: 'https://bsky.app/profile/username',
        },
        { name: 'Website', url: user.website_url, icon: <Globe />, placeholer: 'https://www.seu-site.com' },
    ];

    function handleOpenLinkDialog() {
        setOpenLinkDialog(true);
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        patch(route('profile.links'), {
            preserveScroll: true,
            onFinish: () => {
                setOpenLinkDialog(false);
                toast({
                    description: 'Os links foram atualizados com sucesso.',
                });
            },
        });
    }

    return (
        <>
            <Card className="mt-4 w-full p-4 md:w-80">
                <CardDescription className="flex items-center justify-between text-sm">
                    Links
                    <Button variant="ghost" onClick={handleOpenLinkDialog}>
                        <PiNotePencilBold />
                    </Button>
                </CardDescription>
                <CardContent className="-mt-4 flex items-center justify-center gap-2 p-2">
                    {links
                        .sort((a, b) => (a.url ? 0 : 1) - (b.url ? 0 : 1))
                        .map((link) => (
                            <Badge
                                key={link.name}
                                className="flex aspect-square h-10 w-10 items-center justify-center p-0"
                                variant="outline"
                                onClick={handleOpenLinkDialog}
                            >
                                {!link.url ? (
                                    <PlusIcon className="cursor-pointer" />
                                ) : (
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.icon}
                                    </a>
                                )}
                            </Badge>
                        ))}
                </CardContent>
                <Dialog open={openLinkDialog} onOpenChange={setOpenLinkDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Links</DialogTitle>
                            <DialogDescription>
                                Adicione suas redes sociais e seu site ou portfólio. Isso permitirá que recrutadores conheçam melhor seu trabalho e
                                sua presença online.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="p-4">
                            <div className="grid grid-cols-1 items-center justify-center gap-4">
                                {links.map((link) => (
                                    <div key={link.name} className="flex items-center justify-center gap-2">
                                        <Badge className="flex aspect-square h-10 w-10 items-center justify-center p-0" variant="outline">
                                            <span> {link.icon}</span>
                                        </Badge>
                                        <input
                                            type="text"
                                            placeholder={link.placeholer}
                                            value={data[Link[link.name]]}
                                            onChange={(e) => setData(Link[link.name], e.target.value)}
                                            className="placeholder:text-muted w-full rounded-md border p-2"
                                        />
                                        <InputError className="mt-2" message={errors[Link[link.name]]} />
                                    </div>
                                ))}
                            </div>
                            {/*<InputError className="mt-2" message={errors.bio} />*/}
                            <div className="mt-4 flex flex-col sm:flex-row sm:justify-end">
                                <Button type="submit" disabled={processing}>
                                    <UserIcon /> Guardar
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Card>
        </>
    );
}
