import { useState, type ReactNode } from "react";

interface CustomTabsProps {
    defaultValue: string;
    onValueChange?: (value: string) => void;
    className?: string;
    children: ReactNode | ((activeTab: string, handleTabChange: (value: string) => void) => ReactNode);
}

export function CustomTabs({ defaultValue, onValueChange, className = "", children }: CustomTabsProps) {
    const [activeTab, setActiveTab] = useState<string>(defaultValue);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        if (onValueChange) {
            onValueChange(value);
        }
    };

    return (
        <div className={className} data-state={activeTab}>
            {typeof children === "function" ? children(activeTab, handleTabChange) : children}
        </div>
    );
}

interface CustomTabsListProps {
    className?: string;
    children: ReactNode;
}

export function CustomTabsList({ className = "", children }: CustomTabsListProps) {
    return (
        <div className={`flex ${className}`}>
            {children}
        </div>
    );
}

interface CustomTabsTriggerProps {
    value: string;
    activeTab: string;
    onClick: () => void;
    className?: string;
    children: ReactNode;
}

export function CustomTabsTrigger({ value, activeTab, onClick, className = "", children }: CustomTabsTriggerProps) {
    const isActive = activeTab === value;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`transition-all duration-200 py-2 cursor-pointer font-medium tracking-tight ${
                isActive 
                    ? "text-neutral-900 border-b-2 border-black " 
                    : "text-neutral-500 hover:text-neutral-900 bg-transparent"
            } ${className}`}
        >
            {children}
        </button>
    );
}