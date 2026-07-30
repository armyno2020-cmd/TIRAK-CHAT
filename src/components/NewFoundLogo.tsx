import React from "react";

interface NewFoundLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export const NewFoundLogo: React.FC<NewFoundLogoProps> = ({
  size = "md",
  showText = false,
  className = "",
}) => {
  const sizeMap = {
    sm: { box: "w-8 h-8", svg: 32, text: "text-base" },
    md: { box: "w-12 h-12", svg: 48, text: "text-xl" },
    lg: { box: "w-20 h-20", svg: 80, text: "text-2xl" },
    xl: { box: "w-28 h-28", svg: 112, text: "text-3xl" },
  };

  const currentSize = sizeMap[size];
  const logoImageUrl = "/tirak_logo.png";

  return (
    <div
      className={`inline-flex flex-col items-center justify-center ${className}`}
    >
      <div
        className={`relative flex items-center justify-center ${currentSize.box} drop-shadow-md`}
      >
        <img
          className="w-full h-full object-contain transition-transform hover:scale-105 duration-300 rounded-xl"
          src={logoImageUrl}
          alt="TIRAK CHAT Logo"

          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = "https://img1.pic.in.th/images/5238c478e33ac7c36ea2c0e3f2383266.png";
          }}
        />
      </div>

      {showText && (
        <div className="mt-2 text-center">
          <span
            className={`font-th-heading font-extrabold tracking-wider text-[#7e5356] uppercase ${currentSize.text}`}
          >
            TIRAK CHAT
          </span>
        </div>
      )}
    </div>
  );
};

export const TirakChatLogo = NewFoundLogo;
