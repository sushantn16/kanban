'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
const Navigation = () => {
    const pathname = usePathname();

    const isActive = (href: string) => {
        return pathname.includes(href)  ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400';
    };

    return (
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
            <Link className={isActive('/quest')} href="/quest">
                Quest
            </Link>
            <Link className={isActive('/active')} href="/active">
                Active Tasks
            </Link>
            <Link className={isActive('/completed')} href="/completed">
                Completed Tasks
            </Link>
        </nav>
    );
}

export default Navigation;
