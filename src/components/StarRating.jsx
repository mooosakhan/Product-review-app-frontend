"use client"

import { useState } from "react"

export default function StarRating({ rating, onRate, readonly = false, size = "md" }) {
  const [hover, setHover] = useState(null)

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  const containerSizeClasses = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
  }

  return (
    <div className={`flex items-center ${containerSizeClasses[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hover || rating)
        const isHovered = hover && star <= hover

        return (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onRate && onRate(star)}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(null)}
            disabled={readonly}
            className={`
              ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}
              ${sizeClasses[size]}
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded
              ${isActive ? "text-yellow-400" : "text-gray-300"}
              ${isHovered ? "drop-shadow-sm" : ""}
              ${!readonly ? "hover:text-yellow-500" : ""}
            `}
            aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
          >
            <svg className="w-full h-full fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        )
      })}

      {!readonly && <span className="ml-2 text-sm text-gray-500 font-medium">{hover || rating}/5</span>}
    </div>
  )
}
