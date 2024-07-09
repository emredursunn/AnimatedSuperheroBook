import { create } from "zustand";

interface Carousel {
    activeSlide: number
    setActiveSlide: (val: number) => void
}

export const useCarouselStore = create<Carousel>(
    (set) => ({
        activeSlide: 0,
        setActiveSlide: (val) => set({ activeSlide: val })
    })
)