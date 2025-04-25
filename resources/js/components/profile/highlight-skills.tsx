import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { Code } from 'lucide-react';
import { ComponentProps, FormEvent, useState } from 'react';

interface HighlightSkillsForm {
    skills: Option[];
}

interface HighlightSkillsProps extends ComponentProps<'div'> {
    skills: Option[];
    authSkills: Option[];
}

export function HighlightSkills({ skills, authSkills, ...props }: HighlightSkillsProps) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const { data, setData, post, errors, processing } = useForm<Required<HighlightSkillsForm>>({
        skills: authSkills,
    });

    function submitForm(e: FormEvent) {
        e.preventDefault();
        setData('skills', data.skills);
        post(route('profile.highlight-skills'), {
            onFinish: () => {
                setOpen(false);
                toast({
                    title: 'Tecnologias destacadas com sucesso',
                    description: 'As tecnologias foram destacadas com sucesso.',
                });
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} {...props}>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Code />
                    Destacar tecnologias
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Destacar Tecnologias</DialogTitle>
                    <DialogDescription>
                        Destaque as tecnologias que você mais gosta de usar ou que são mais relevantes para o seu trabalho. Isso ajudará os visitantes
                        a entenderem melhor suas habilidades e interesses.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitForm}>
                    <div className="*:not-first:mt-2">
                        <Label>Selecionar Tecnolodia</Label>
                        <MultipleSelector
                            commandProps={{
                                label: 'Selecionar tecnologias',
                            }}
                            defaultOptions={skills}
                            placeholder="Selecione as tecnologias"
                            emptyIndicator={<p className="text-center text-sm"> Nenhum resultado encontrado</p>}
                            value={authSkills}
                            onChange={(skills) => setData('skills', skills)}
                        />
                        <InputError message={errors.skills} />
                    </div>
                    <DialogFooter className="mt-8">
                        <Button type="submit" disabled={processing} variant="default">
                            <Code /> Destacar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
