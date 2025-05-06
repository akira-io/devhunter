<?php

declare(strict_types=1);

namespace App\Foundation;

use Illuminate\Support\Collection;

final class Inspiring extends \Illuminate\Foundation\Inspiring
{
    /**
     * The quotes that are used by the application.
     *
     * @return Collection<int,string>
     */
    public static function quotes(): Collection
    {
        return new Collection([
            'Age apenas segundo aquela máxima através da qual possas, ao mesmo tempo, querer que ela se torne uma lei universal. - Immanuel Kant',
            'Uma vida não examinada não merece ser vivida. - Sócrates',
            'Estar presente acima de tudo. - Naval Ravikant',
            'Faz o que puderes, com o que tens, onde estás. - Theodore Roosevelt',
            'A felicidade não é algo pronto. Vem das tuas próprias ações. - Dalai Lama',
            'Quem está satisfeito é rico. - Laozi',
            'Começo a falar apenas quando tenho a certeza de que o que vou dizer não é melhor ficar por dizer. - Cato, o Jovem',
            'Não falhei. Apenas descobri 10.000 maneiras que não funcionam. - Thomas Edison',
            'Se não tiveres um objetivo consistente na vida, não a poderás viver de forma consistente. - Marco Aurélio',
            'Nunca é tarde para seres aquilo que poderias ter sido. - George Eliot',
            'Não é o homem que tem pouco, mas o que deseja mais, que é pobre. - Séneca',
            'O que importa é a qualidade, não a quantidade. - Lucius Annaeus Seneca',
            'Saber não é suficiente; é preciso aplicar. Estar disposto não é suficiente; é preciso agir. - Leonardo da Vinci',
            'Que todas as tuas coisas tenham o seu lugar; que cada parte do teu trabalho tenha o seu tempo. - Benjamin Franklin',
            'Vive como se fosses morrer amanhã. Aprende como se fosses viver para sempre. - Mahatma Gandhi',
            'Sem palavras em excesso nem ações desnecessárias. - Marco Aurélio',
            'Nada que valha a pena ter vem facilmente. - Theodore Roosevelt',
            'Ordena a tua alma. Reduz os teus desejos. - Santo Agostinho',
            'As pessoas encontram prazer de diferentes formas. Eu encontro-o em manter a mente clara. - Marco Aurélio',
            'A simplicidade é um gosto adquirido. - Katharine Gerould',
            'A simplicidade é a consequência de emoções refinadas. - Jean D\'Alembert',
            'A simplicidade é a essência da felicidade. - Cedric Bledsoe',
            'A simplicidade é a sofisticação suprema. - Leonardo da Vinci',
            'Sorri, respira e anda devagar. - Thich Nhat Hanh',
            'A única forma de fazer um ótimo trabalho é amar o que fazes. - Steve Jobs',
            'Todo o futuro está na incerteza: vive o agora. - Séneca',
            'Muito pouco é necessário para uma vida feliz. - Marco Aurélio',
            'Não percas mais tempo a discutir o que um bom homem deveria ser. Sê um. - Marco Aurélio',
            'Bem começado é meio feito. - Aristóteles',
            'Quando não há desejo, todas as coisas estão em paz. - Laozi',
            'Anda como se estivesses a beijar a Terra com os teus pés. - Thich Nhat Hanh',
            'Porque estás vivo, tudo é possível. - Thich Nhat Hanh',
            'Ao inspirar, acalmo o corpo e a mente. Ao expirar, sorrio. - Thich Nhat Hanh',
            'A vida só está disponível no momento presente. - Thich Nhat Hanh',
            'A melhor forma de cuidar do futuro é cuidar do momento presente. - Thich Nhat Hanh',
            'Nada na vida deve ser temido, apenas compreendido. Agora é o momento de compreendermos mais, para temermos menos. - Marie Curie',
            'A maior batalha é a guerra contra a ignorância. - Mustafa Kemal Atatürk',
            'Lembra-te sempre de que és absolutamente único. Tal como toda a gente. - Margaret Mead',
            'Deves ser a mudança que desejas ver no mundo. - Mahatma Gandhi',
            'Temos de lançar. - Taylor Otwell',
        ]);
    }
}
