import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";

interface IFlipCard {
    front?: { children?: React.ReactNode, flipButton?: React.ReactElement }
    back?: { children?: React.ReactNode, flipButton?: React.ReactElement }
    renderFront?: (isFlipped: boolean, setIsFlipped: Dispatch<SetStateAction<boolean>>) => React.ReactNode
    renderBack?: (isFlipped: boolean, setIsFlipped: Dispatch<SetStateAction<boolean>>) => React.ReactNode
    className?: string
}

export const FlipCard = ({ renderFront, renderBack, className }: IFlipCard) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="absolute w-full h-full md:origin-top-left origin-center"
            style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                transition: "transform 0.6s ease-in-out",
            }}>

            <div
                className={cn(
                    "absolute flex flex-col justify-center items-center backdrop-blur-lg",
                    "rounded-r-3xl md:rounded-l-none rounded-l-3xl w-full h-full z-50",
                    className
                )}
                style={{ backfaceVisibility: "hidden" }}
            >
                {renderFront && renderFront(isFlipped, setIsFlipped)}          
            </div>
            
            <div
                className={cn(
                    "absolute flex flex-col justify-center items-center backdrop-blur-lg",
                    "rounded-l-3xl md:rounded-r-none rounded-r-3xl w-full h-full z-50",
                    className)}
                style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                }}
            >
                {renderBack && renderBack(isFlipped, setIsFlipped)}
            </div>
        </div>
    )
}