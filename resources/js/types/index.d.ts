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
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Project {
    id: number;
    title: string;
    pm_name: string;
    team_members: string;
    pic_name: string;
    pic_email: string;
    pic_phone: string;
    user: {
        name: string;
    };
    rating_links: RatingLink[];
}

export interface Questionnaire {
    id: number;
    title: string;
    description: string;
    questions: Question[];
    rating_links: RatingLink[];
}

export interface Question {
    id: number;
    text: string;
    type: string;
    order_number: integer;
    is_required: boolean;
    questionnaire?: {
        title: string;
        description: string;
    };
    answer_options: AnswerOption[];
}

export interface AnswerOption {
    id: number;
    value: integer;
    label: string;
    question?: {
        text: string;
        type: string;
        order_number: integer;
        is_required: boolean;
    };
}