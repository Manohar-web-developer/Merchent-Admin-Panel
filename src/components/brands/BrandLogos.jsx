import React from "react";

export const BrandLogo = ({ name, size = "md" }) => {
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-xs",
    lg: "w-11 h-11 text-sm",
  }[size] || "w-9 h-9 text-xs";

  const renderLogoContent = () => {
    switch (name?.toLowerCase().trim()) {
      case "nike":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
            <path d="M21.707 5.293c-.273-.273-.782-.162-1.077.202-2.88 3.555-6.685 6.963-10.457 9.878-2.617-2.607-4.475-3.864-5.328-4.225-.615-.26-1.282.046-1.503.655-.246.68.107 1.41.745 1.747 1.455.768 3.82 2.632 6.545 6.386.208.286.54.457.892.457.307 0 .602-.13.812-.358 4.795-5.207 9.534-11.758 9.588-13.67.014-.523-.218-.946-.218-1.072z" />
          </svg>
        );
      case "adidas":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
            <path d="M22 18.5L16.2 8.5H12L17.8 18.5H22ZM15.5 18.5L10.7 10.2H6.5L11.3 18.5H15.5ZM9 18.5L5.2 12H1L4.8 18.5H9Z" />
          </svg>
        );
      case "puma":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
            <path d="M19.5 6.5c-1.1 0-2.1.4-2.8 1.1l-2.2 2.2c-.4.4-.9.6-1.5.6H9c-.6 0-1.1-.4-1.3-.9l-1.2-3c-.2-.6-.8-1-1.5-1H3v2h2l1.2 3c.4 1 1.4 1.7 2.5 1.7h4c1.1 0 2.1-.4 2.8-1.1l2.2-2.2c.4-.4.9-.6 1.5-.6h.3c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2v2h2c1.7 0 3-1.3 3-3V7.5c0-.6-.4-1-1-1h-.5z" />
          </svg>
        );
      case "zara":
        return (
          <span className="font-serif font-black tracking-tighter text-[10px] text-black scale-y-110 select-none">
            ZARA
          </span>
        );
      case "h&m":
      case "hm":
        return (
          <span className="font-sans font-black italic text-[11px] text-[#E50010] select-none">
            H&M
          </span>
        );
      case "levi's":
      case "levis":
        return (
          <div className="bg-[#C41230] text-white px-1.5 py-0.5 rounded-[3px] text-[8px] font-black tracking-tighter select-none">
            Levi's
          </div>
        );
      case "reebok":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
            <path d="M12 4L3 8v8l9 4 9-4V8l-9-4zm7 11.5l-7 3.1-7-3.1V9.5l7-3.1 7 3.1v6z" />
          </svg>
        );
      case "gucci":
        return (
          <span className="font-serif font-bold text-[9px] tracking-widest text-black select-none">
            GUCCI
          </span>
        );
      case "prada":
        return (
          <span className="font-serif font-extrabold text-[9px] tracking-wider text-black select-none">
            PRADA
          </span>
        );
      case "apple":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.16c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 0.6-2.65 1.36-.58.67-.99 1.74-.85 2.78 1.01.08 2.05-.53 2.58-1.29z" />
          </svg>
        );
      case "sony":
        return (
          <span className="font-serif font-black text-[9px] tracking-widest text-black select-none">
            SONY
          </span>
        );
      default:
        // Get initials (up to 2 letters)
        const initials = name
          ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
          : "B";
        return (
          <span className="font-bold text-gray-700 select-none">
            {initials}
          </span>
        );
    }
  };

  return (
    <div
      className={`${sizeClasses} rounded-lg border border-gray-200/80 bg-white flex items-center justify-center p-1 shadow-2xs shrink-0 transition-transform duration-150 group-hover:scale-105`}
    >
      {renderLogoContent()}
    </div>
  );
};
