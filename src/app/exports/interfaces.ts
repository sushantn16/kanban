export interface Quest {
    id: number,
    name: string,
    description: string | null;
}

export interface TaskResponse {
    id: number;
    task_name: string;
    description: string;
    priority: string;
    status: string;
    project_id: number;
    user_id: string;
    createdAt: Date;
    updatedAt: Date | null;
    user: User
    project: Project
}

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
};

export interface Project {
    id: number
    name: string
}

export interface Task {
    name: string;
    description: string;
    priority: string;
    status: string;
}

export interface TaskProps {
    projectId: number;
}