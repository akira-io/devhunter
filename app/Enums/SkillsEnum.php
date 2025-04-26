<?php

declare(strict_types=1);

namespace App\Enums;

enum SkillsEnum: string
{
    // Languages
    case JavaScript = 'JavaScript';
    case TypeScript = 'TypeScript';
    case Python = 'Python';
    case PHP = 'PHP';
    case Go = 'Go';
    case Rust = 'Rust';
    case Java = 'Java';
    case Kotlin = 'Kotlin';
    case Swift = 'Swift';
    case Ruby = 'Ruby';
    case Cpp = 'C++';
    case CSharp = 'C#';

    // Frontend Frameworks & Libraries
    case React = 'React';
    case Vue = 'Vue';
    case Angular = 'Angular';
    case Svelte = 'Svelte';
    case NextJs = 'Next.js';
    case NuxtJs = 'Nuxt.js';

    // Backend Frameworks
    case Laravel = 'Laravel';
    case Symfony = 'Symfony';
    case NodeJs = 'Node.js';
    case Express = 'Express';
    case NestJs = 'NestJS';
    case Django = 'Django';
    case Flask = 'Flask';
    case Spring = 'Spring';
    case DotNet = '.NET';

    // DevOps & Platforms
    case Docker = 'Docker';
    case Kubernetes = 'Kubernetes';
    case Firebase = 'Firebase';
    case AWS = 'AWS';
    case Azure = 'Azure';
    case GCP = 'GCP';

    // Databases
    case MySQL = 'MySQL';
    case PostgreSQL = 'PostgreSQL';
    case SQLite = 'SQLite';
    case MongoDB = 'MongoDB';
    case Redis = 'Redis';

    // Cybersecurity
    case PenTesting = 'PenTesting';
    case EthicalHacking = 'EthicalHacking';
    case NetworkSecurity = 'NetworkSecurity';
    case WebSecurity = 'WebSecurity';
    case MalwareAnalysis = 'MalwareAnalysis';
    case IncidentResponse = 'IncidentResponse';
    case ThreatHunting = 'ThreatHunting';
    case VulnerabilityAssessment = 'VulnerabilityAssessment';
    case SecurityAuditing = 'SecurityAuditing';
    case RiskManagement = 'RiskManagement';
    case Compliance = 'Compliance';
    case IncidentManagement = 'IncidentManagement';
    case DigitalForensics = 'DigitalForensics';
    case SecurityAwareness = 'SecurityAwareness';
    case CloudSecurity = 'CloudSecurity';
    case ApplicationSecurity = 'ApplicationSecurity';
    case DataProtection = 'DataProtection';
    case SIEM = 'SIEM';

    /**
     * Get all enum cases as an array of associative arrays.
     *
     * @return array<int, mixed>
     */
    public static function get(): array
    {
        return collect(self::cases())
            ->map(fn (self $skill): array => [
                'value' => $skill->value,
                'label' => $skill->value,
            ])
            ->toArray();
    }

    /**
     * Get the enum case from an array of strings.
     *
     * @param  list<mixed>  $skills
     * @return array<int, mixed>
     */
    public static function getFromDb(?array $skills = null): array
    {

        return collect($skills)

            ->map(
                fn (mixed $skill): array => [
                    'value' => $skill,
                    'label' => $skill,
                ])
            ->toArray();
    }

    /**
     * Get the enum values as an array of strings.
     *
     * @return array<int, mixed>
     */
    public static function getValues(): array
    {
        return collect(self::cases())
            ->map(fn (self $skill): string => $skill->value)
            ->toArray();
    }
}
