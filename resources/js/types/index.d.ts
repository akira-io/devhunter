import { Option } from '@/components/ui/multiselect';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;

    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url?: string;
    bio?: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
    location?: string;
    skills?: Option[];
    website_url?: string;
    github_url?: string;
    twitter_url?: string;
    linkedin_url?: string;
    bluesky_url?: string;
    youtube_url?: string;
    professional_educations?: AcademicBackground[];
    has_followed: boolean;
    user_name?: string;
    background_image_url: string;

    [key: string]: unknown; // This allows for additional properties...
}

export interface AcademicBackground {
    id: number;
    user_id: number;
    institution: string;
    degree: string;
    start_date: string;
    end_date?: string;
    field_of_study: string;
}

export interface ProfileStoreTypes {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    set: (isOpen: boolean) => void;
}

export interface Hunt {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    owner: User;
    image_url?: string;
    comments: Comment[];
    shares: number;
    likes_count: number;
    views: number;
    has_liked: boolean;
}

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    commenter: User;
    hunt_id: number;
    likes_count: number;
    has_liked: boolean;
}
