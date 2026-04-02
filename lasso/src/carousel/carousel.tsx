import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";

import { Button } from "../button/button";
import { cn } from "../utils/cn";

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

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

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
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

/**
 * CarouselContent - The scrollable container that holds all carousel slides.
 *
 * Wraps the carousel items and provides the overflow handling and flex layout.
 * Must be used as a child of the Carousel component.
 *
 * @param className - Additional CSS classes to apply to the content container
 */
function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
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
function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
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
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft weight="light" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
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
function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight weight="light" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
