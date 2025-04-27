import { Checkbox } from '@/components/ui/checkbox';
import { Option } from '@/components/ui/multiselect';
import { ProfessionalEducation, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface ProfileCompletionProps {
    professionalEducations: ProfessionalEducation[];
    skills: Option[];
}

export function ProfileCompletion({ skills, professionalEducations }: ProfileCompletionProps) {
    const { auth } = usePage<SharedData>().props;

    const profileCompletion = [
        {
            label: 'Informações básicas',
            done: !!(auth.user.name && auth.user.email),
        },
        {
            label: 'Foto de perfil',
            done: !!auth.user.avatar_url,
        },
        {
            label: 'Links',
            done: !!(
                auth.user.website_url ||
                auth.user.linkedin_url ||
                auth.user.github_url ||
                auth.user.twitter_url ||
                auth.user.bluesky_url ||
                auth.user.youtube_url
            ),
        },
        {
            label: 'Sobre você',
            done: !!auth.user.bio,
        },
        {
            label: 'Destaques Acadêmicos',
            done: professionalEducations.length > 0,
        },
        // {
        //     label: 'Destaques Profissionais',
        //     done: professionalEducations.length > 0, // ou outro campo de destaque
        // },
        {
            label: 'Técnolodias em destque',
            done: skills && skills.length > 0,
        },
    ];
    return (
        <section className="bg-background rounded-lg border p-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Complete seu perfil</h3>
                    <p className="text-sm text-gray-400">Perfis completos atraem mais oportunidades!</p>
                </div>
                <span className="text-sm text-gray-400">
                    {Math.round((profileCompletion.filter((item) => item.done).length / profileCompletion.length) * 100)}% completo
                </span>
            </div>
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-700">
                <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${(profileCompletion.filter((item) => item.done).length / profileCompletion.length) * 100}%` }}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {profileCompletion.map((item) => (
                    <label key={item.label} className="flex cursor-pointer items-center space-x-2">
                        <Checkbox checked={item.done} className="h-4 w-4 rounded border-gray-600 text-green-500 focus:ring-0" />
                        <span className={`text-sm ${item.done ? 'text-gray-500 line-through' : ''}`}>{item.label}</span>
                    </label>
                ))}
            </div>
        </section>
    );
}
