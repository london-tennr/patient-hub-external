import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { Button } from "../button/button";
import { cn } from "../utils/cn";
const CarouselContext = React.createContext(null);
/**
 * Hook to access carousel context from child components.
 *
 * Provides access to the carousel ref, API, options, orientation, and scroll functions.
 * Must be used within a Carousel component.
 *
 * @returns The carousel context containing carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, and canScrollNext
 * @throws Error if used outside of a Carousel component
 */
function useCarousel() {
    const context = React.useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }
    return context;
}
/**
 * Carousel Component
 *
 * A slideshow-style container for cycling through a series of content items (slides).
 * Provides navigation controls to move between items and supports both horizontal and
 * vertical orientations. Built on top of Embla Carousel for smooth, touch-friendly,
 * and accessible interactions within the Tennr design system.
 *
 * @see [Embla Carousel](https://www.embla-carousel.com/)
 *
 * @see [Lasso Carousel README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/carousel/README.md)
 *
 * @param orientation - Direction of the carousel ("horizontal" | "vertical"). Defaults to "horizontal".
 * @param opts - Embla Carousel options for customizing behavior
 * @param setApi - Callback to receive the Embla API instance
 * @param plugins - Array of Embla Carousel plugins
 * @param className - Additional CSS classes
 */
function Carousel({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }) {
    const [carouselRef, api] = useEmblaCarousel({
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
    }, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api) => {
        if (!api)
            return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
        api?.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback((event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollPrev();
        }
        else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollNext();
        }
    }, [scrollPrev, scrollNext]);
    React.useEffect(() => {
        if (!api || !setApi)
            return;
        setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
        if (!api)
            return;
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);
        return () => {
            api?.off("select", onSelect);
        };
    }, [api, onSelect]);
    return (_jsx(CarouselContext.Provider, { value: {
            carouselRef,
            api: api,
            opts,
            orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext,
        }, children: _jsx("div", { onKeyDownCapture: handleKeyDown, className: cn("relative", className), role: "region", "aria-roledescription": "carousel", "data-slot": "carousel", ...props, children: children }) }));
}
/**
 * CarouselContent - The scrollable container that holds all carousel slides.
 *
 * Wraps the carousel items and provides the overflow handling and flex layout.
 * Must be used as a child of the Carousel component.
 *
 * @param className - Additional CSS classes to apply to the content container
 */
function CarouselContent({ className, ...props }) {
    const { carouselRef, orientation } = useCarousel();
    return (_jsx("div", { ref: carouselRef, className: "overflow-hidden", "data-slot": "carousel-content", children: _jsx("div", { className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className), ...props }) }));
}
/**
 * CarouselItem - An individual slide within the carousel.
 *
 * Represents a single slideable item. Use CSS `basis-*` classes to control
 * how many items are visible at once (e.g., `basis-1/2` for two items).
 * Must be used as a child of CarouselContent.
 *
 * @param className - Additional CSS classes (use basis-* for sizing)
 */
function CarouselItem({ className, ...props }) {
    const { orientation } = useCarousel();
    return (_jsx("div", { role: "group", "aria-roledescription": "slide", "data-slot": "carousel-item", className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className), ...props }));
}
/**
 * CarouselPrevious - Navigation button to scroll to the previous slide.
 *
 * Renders a button with an arrow icon that scrolls the carousel backward.
 * Automatically disabled when at the beginning of the carousel.
 * Position adjusts based on carousel orientation.
 *
 * @param variant - Button style variant. Defaults to "outline".
 * @param size - Button size. Defaults to "icon".
 * @param className - Additional CSS classes for positioning adjustments
 */
function CarouselPrevious({ className, variant = "outline", size = "icon", ...props }) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (_jsxs(Button, { "data-slot": "carousel-previous", variant: variant, size: size, className: cn("absolute size-8 rounded-full", orientation === "horizontal"
            ? "top-1/2 -left-12 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className), disabled: !canScrollPrev, onClick: scrollPrev, ...props, children: [_jsx(ArrowLeft, { weight: "light" }), _jsx("span", { className: "sr-only", children: "Previous slide" })] }));
}
/**
 * CarouselNext - Navigation button to scroll to the next slide.
 *
 * Renders a button with an arrow icon that scrolls the carousel forward.
 * Automatically disabled when at the end of the carousel.
 * Position adjusts based on carousel orientation.
 *
 * @param variant - Button style variant. Defaults to "outline".
 * @param size - Button size. Defaults to "icon".
 * @param className - Additional CSS classes for positioning adjustments
 */
function CarouselNext({ className, variant = "outline", size = "icon", ...props }) {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (_jsxs(Button, { "data-slot": "carousel-next", variant: variant, size: size, className: cn("absolute size-8 rounded-full", orientation === "horizontal"
            ? "top-1/2 -right-12 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className), disabled: !canScrollNext, onClick: scrollNext, ...props, children: [_jsx(ArrowRight, { weight: "light" }), _jsx("span", { className: "sr-only", children: "Next slide" })] }));
}
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, };
