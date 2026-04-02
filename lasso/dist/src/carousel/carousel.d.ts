import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import * as React from "react";
import { Button } from "../button/button";
/** The Embla Carousel API instance for programmatic control. */
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
/** Configuration options passed to Embla Carousel. */
type CarouselOptions = UseCarouselParameters[0];
/** Embla Carousel plugins for extended functionality. */
type CarouselPlugin = UseCarouselParameters[1];
/**
 * Props for the Carousel component.
 */
type CarouselProps = {
    /** Embla Carousel options (align, loop, dragFree, etc.) */
    opts?: CarouselOptions;
    /** Array of Embla Carousel plugins */
    plugins?: CarouselPlugin;
    /** Direction of the carousel. Defaults to "horizontal". */
    orientation?: "horizontal" | "vertical";
    /** Callback to receive the Embla API instance for programmatic control */
    setApi?: (api: CarouselApi) => void;
};
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
declare function Carousel({ orientation, opts, setApi, plugins, className, children, ...props }: React.ComponentProps<"div"> & CarouselProps): import("react/jsx-runtime").JSX.Element;
/**
 * CarouselContent - The scrollable container that holds all carousel slides.
 *
 * Wraps the carousel items and provides the overflow handling and flex layout.
 * Must be used as a child of the Carousel component.
 *
 * @param className - Additional CSS classes to apply to the content container
 */
declare function CarouselContent({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * CarouselItem - An individual slide within the carousel.
 *
 * Represents a single slideable item. Use CSS `basis-*` classes to control
 * how many items are visible at once (e.g., `basis-1/2` for two items).
 * Must be used as a child of CarouselContent.
 *
 * @param className - Additional CSS classes (use basis-* for sizing)
 */
declare function CarouselItem({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
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
declare function CarouselPrevious({ className, variant, size, ...props }: React.ComponentProps<typeof Button>): import("react/jsx-runtime").JSX.Element;
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
declare function CarouselNext({ className, variant, size, ...props }: React.ComponentProps<typeof Button>): import("react/jsx-runtime").JSX.Element;
export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, };
//# sourceMappingURL=carousel.d.ts.map