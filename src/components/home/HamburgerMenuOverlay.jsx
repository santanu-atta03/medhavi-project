"use client"
import React, { useState, useEffect, useRef } from "react"
import { MdOutlineMenu } from "react-icons/md"
import { RxCross1 } from "react-icons/rx"
import { cn } from "../lib/utils" // Optional className utility

const HamburgerMenuOverlay = ({
  items = [],
  buttonTop = "60px",
  buttonRight = "60px",
  buttonSize = "sm",
  buttonColor="#ffffff",
  overlayBackground = "#6c8cff",
  textColor = "#ffffff",
  fontSize = "sm",
  fontFamily = '"Krona One", monospace',
  fontWeight = "bold",
  animationDuration = 1.5,
  staggerDelay = 0.1,
  menuAlignment = "left",
  className,
  buttonClassName,
  menuItemClassName,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  menuDirection = "vertical",
  enableBlur = false,
  zIndex = 1000,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const containerRef = useRef(null)

  const buttonSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const fontSizes = {
    sm: "text-xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    "2xl": "text-6xl md:text-7xl",
  }

  const toggleMenu = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (newState) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }

  const handleItemClick = (item) => {
    if (item.onClick) item.onClick()
    else if (item.href) window.location.href = item.href

    if (!keepOpenOnItemClick) {
      setIsOpen(false)
      onClose?.()
    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
        onClose?.()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const clipX = buttonRight ? `calc(100% - ${buttonRight})` : "60px"
  const mobileClipX = buttonRight ? "calc(100% - 30px)" : "30px"
  const buttonPositionCSS = buttonRight
    ? `right: ${buttonRight}; transform: translate(50%, -50%);`
    : `left: 60px; transform: translate(-50%, -50%);`

  return (
    <div ref={containerRef} className={cn("absolute w-[40%] h-full", className)}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Krona+One:wght@400&display=swap');

          .hamburger-overlay-${zIndex} {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: start;
            align-items: center;
            background: ${overlayBackground};
            z-index: ${zIndex};
            clip-path: circle(0px at ${clipX} ${buttonTop});
            transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            ${enableBlur ? "backdrop-filter: blur(10px);" : ""}
          }

          .hamburger-overlay-${zIndex}.open {
            clip-path: circle(150% at ${clipX} ${buttonTop});
          }

          .hamburger-button-${zIndex} {
            position: absolute;
            top: ${buttonTop};
            ${buttonPositionCSS}
            border-radius: 20px;
            z-index: ${zIndex + 1};
            background: ${buttonColor};
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .hamburger-button-${zIndex}:hover {
            transform: ${buttonRight ? "translate(50%, -50%) scale(1.1);" : "translate(-50%, -50%) scale(1.1);"}
          }

          .hamburger-button-${zIndex}:focus {
            outline: 2px solid ${textColor};
            outline-offset: 2px;
          }

          .menu-items-${zIndex} {
            ${menuDirection === "horizontal" ? "display: flex; flex-wrap: wrap; gap: 1rem;" : ""}
            ${menuAlignment === "center" ? "text-align: center;" : ""}
            ${menuAlignment === "right" ? "text-align: right;" : ""}
          }

          .menu-item-${zIndex} {
            position: relative;
            list-style: none;
            padding: 0.5rem 0;
            cursor: pointer;
            transform: translateX(200px);
            opacity: 0;
            transition: all 0.3s ease;
            font-family: ${fontFamily};
            font-weight: ${fontWeight};
            color: ${textColor};
            ${menuDirection === "horizontal" ? "display: inline-block; margin: 0 1rem;" : ""}
          }

          .menu-item-${zIndex}.visible {
            transform: translateX(0);
            opacity: 1;
          }

          .menu-item-${zIndex}::before {
            content: "";
            position: absolute;
            left: -20%;
            top: 50%;
            transform: translate(-50%, -50%) translateX(-50%);
            width: 25%;
            height: 8px;
            border-radius: 10px;
            background: ${textColor};
            opacity: 0;
            transition: all 0.25s ease;
            pointer-events: none;
          }

          .menu-item-${zIndex}:hover::before {
            opacity: 1;
            transform: translate(-50%, -50%) translateX(0);
          }

          .menu-item-${zIndex} span {
            opacity: 0.7;
            transition: opacity 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .menu-item-${zIndex}:hover span {
            opacity: 1;
          }

          .menu-item-${zIndex}:focus {
            outline: 2px solid ${textColor};
            outline-offset: 2px;
            border-radius: 4px;
          }

          @media (max-width: 768px) {
            .hamburger-button-${zIndex} {
              ${buttonRight ? "right: 30px;" : "left: 30px;"}
              top: 30px;
            }

            .hamburger-overlay-${zIndex} {
              clip-path: circle(0px at ${mobileClipX} 30px);
            }

            .hamburger-overlay-${zIndex}.open {
              clip-path: circle(150% at ${mobileClipX} 30px);
            }

            .menu-items-${zIndex} {
              padding: 1rem;
              max-height: 80vh;
              overflow-y: auto;
            }

            .menu-item-${zIndex} {
              padding: 1rem 0;
            }
          }

          @media (max-width: 480px) {
            .menu-items-${zIndex} {
              ${menuDirection === "horizontal" ? "flex-direction: column; gap: 0;" : ""}
            }

            .menu-item-${zIndex} {
              ${menuDirection === "horizontal" ? "display: block; margin: 0;" : ""}
            }
          }
        `}
      </style>

      {/* Overlay Menu */}
      <div
        ref={navRef}
        className={cn(`flex flex-col items-center justify-center h-full hamburger-overlay-${zIndex}`, isOpen && "open")}
        aria-hidden={!isOpen}
      >
        <ul className={cn(`mt-20 menu-items-${zIndex}`, menuDirection === "horizontal" && "flex flex-wrap")}>
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(`menu-item-${zIndex}`, fontSizes[fontSize], isOpen && "visible", menuItemClassName)}
              style={{
                transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s",
              }}
              onClick={() => handleItemClick(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleItemClick(item)
                }
              }}
              tabIndex={isOpen ? 0 : -1}
              role="button"
              aria-label={`Navigate to ${item.label}`}
            >
              <span>
                {item.icon && <span className="menu-icon">{item.icon}</span>}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Button */}
      <button
        className={cn(`hamburger-button-${zIndex}`, buttonSizes[buttonSize], buttonClassName)}
        onClick={toggleMenu}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
      >
        {customButton || (
          <div className="relative w-full h-full flex items-center justify-center">
            <MdOutlineMenu
              className={cn("absolute transition-all duration-300", isOpen ? "opacity-0 rotate-45 scale-0" : "opacity-100")}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
            <RxCross1
              className={cn("absolute transition-all duration-300", isOpen ? "opacity-100" : "opacity-0 -rotate-45 scale-0")}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
          </div>
        )}
      </button>
    </div>
  )
}

export default HamburgerMenuOverlay
