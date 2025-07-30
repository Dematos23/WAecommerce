
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div
        className="relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer"
        onClick={() => openModal(0)}
      >
        <Image
          src={images[0]}
          alt={productName}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full bg-transparent border-0 p-0 shadow-none">
           <div className="relative w-full h-full flex items-center justify-center">
             <Carousel
                opts={{
                  startIndex: selectedIndex,
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video w-full">
                        <Image
                          src={src}
                          alt={`${productName} - image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 text-white bg-black/30 hover:bg-black/50 border-0" />
                <CarouselNext className="absolute right-2 text-white bg-black/30 hover:bg-black/50 border-0" />
              </Carousel>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
