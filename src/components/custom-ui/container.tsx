import { cn } from "@/lib/utils";

interface ContainerProps {
    variant: "main" | "section" | "article";
    color?: string;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties; 
}

export const Container = ({ variant, color, className, children, style, ...props }: ContainerProps) => {
    const Component = variant;

    const styles = {
        main: "relative flex justify-center items-center w-screen h-screen overflow-hidden p-10",
        section: "relative flex justify-center items-center w-full h-full gap-8",
        article: ""
    };

    return (
        <Component
            {...props}
            className={cn(styles[variant], color, className)}
            style={style}
        >
            {children}
        </Component>
    );
};
