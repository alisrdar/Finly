import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

interface EmojiPickerPopProps {
    icon?: string;
    onSelect: (icon: string) => void;
}

const EmojiPickerPop: React.FC<EmojiPickerPopProps> = ({ icon , onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col gap-2 mb-2">
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-3  p-2 rounded-lg hover:bg-muted transition-all duration-200 shadow-sm"
            >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-muted text-primary">
                    {icon ? (
                        <img
                            src={icon}
                            alt="Selected Emoji"
                            className="w-10 h-10"
                        />
                    ) : (
                        <LuImage className="w-8 h-8 text-gray-400" />
                    )}
                </div>
                <span className="text-sm font-medium text-foreground">
                    {icon ? "Change Emoji" : "Select Emoji"}
                </span>
            </button>

            {/* Popover */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="relative">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute z-60 -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-background border border-border hover:bg-muted transition-all duration-200 cursor-pointer"
                        >
                            <LuX className="w-4 h-4 text-muted-foreground" />
                        </button>

                        <EmojiPicker
                            onEmojiClick={(emoji) => {
                                onSelect(emoji?.imageUrl || "");
                                setIsOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default EmojiPickerPop;
