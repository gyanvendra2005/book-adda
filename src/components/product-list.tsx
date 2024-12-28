"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./ui/product-card";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea, ScrollBar } from "./ui/scrollarea"

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<React.RefObject<null>>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/getbooks?category=competative&subCategory=SSB&location=Agra`);
      console.log(response.data.books);
      setProducts(response.data.books);

      toast({
        title: "Success",
        description: "Books fetched successfully!",
      });
    } catch (error) {
      console.error("Error:", error);

      toast({
        title: "Failed to fetch books",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Filter Section */}
  <div className="col-span-1 sm:col-span-1 lg:col-span-1 p-4 bg-gray-100 rounded-lg shadow">
    filter section
    <button onClick={fetchProducts}>search</button>
  </div>

  {/* Books Rendering, Search Bar, and Sort By */}
  <div className="col-span-2">
    <div className="mb-6">
      <input
        type="search"
        placeholder="search"
        className="w-1/3 px-4 py-2 rounded-lg border"
      />
    </div>

    {/* Modal Animation on Active Item */}
    <AnimatePresence>
      {active && typeof active === "object" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 h-full w-full z-10"
        />
      )}
    </AnimatePresence>

    <AnimatePresence>
      {active && typeof active === "object" && (
        <div className="fixed inset-0 grid place-items-center z-[100]">
          <motion.button
            key={`button-${active.bookName}-${id}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.05,
              },
            }}
            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
            onClick={() => setActive(null)}
            aria-label="Close details"
          >
            <CloseIcon />
          </motion.button>

          <motion.div
            layoutId={`card-${active.bookName}-${id}`}
            ref={ref}
            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
          >
            {/* Horizontal Scrollable Image Carousel */}
            <motion.div layoutId={`image-${active.bookImages[0]}-${id}`}>
              <ScrollArea className="w-150 whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                  {active.bookImages.map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-md">
                      <img
                        src={img}
                        alt={`Book image ${index}`}
                        style={{
                          width: "600px", // Consistent width
                          height: "300px", // Height for proper scaling
                          objectFit: "cover", // Ensures the image covers the area
                        }}
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </motion.div>

            <div>
              <div className="flex justify-between items-start p-4">
                <div>
                  <motion.h3
                    layoutId={`title-${active.bookName}-${id}`}
                    className="font-bold text-neutral-700 dark:text-neutral-200"
                  >
                    {active.bookName}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400"
                  >
                    {active.description || "No description available"}
                  </motion.p>
                </div>

                <motion.a
                  layoutId={`button-${active.bookName}-${id}`}
                  href={active.ctaLink}
                  target="_blank"
                  className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  aria-label={`Go to ${active.bookName}`}
                >
                  {active.ctaText || "View Details"}
                </motion.a>
              </div>

              <div className="pt-4 relative px-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                >
                  {typeof active.content === "function" ? active.content() : active.content}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* Product Cards Rendering */}
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((card) => (
        <motion.div
          key={`card-${card.bookName}-${card._id}`}
          layoutId={`card-${card.bookName}-${card._id}`}
          onClick={() => setActive(card)}
          className="flex flex-col justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer bg-white shadow-lg w-full aspect-square p-4 transition"
          style={{
            minHeight: "100px",
            minWidth: "100px",
          }} // Equal size adjustment
          aria-label={`View details of ${card.bookName}`}
        >
          {/* Book Image for Product Card */}
          <motion.div
            layoutId={`image-${card.bookName}-${card._id}`}
            className="flex-shrink-0 w-full h-3/5"
          >
            {card.bookImages && card.bookImages.length > 0 ? (
              <img
                src={card.bookImages[0]}
                alt={card.bookName}
                className="w-full h-full object-cover rounded-md"
                style={{
                  objectFit: "cover", // Ensures the image covers the area without distortion
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
          </motion.div>

          <div className="flex flex-col justify-end mt-4 text-center flex-grow">
            <motion.h3
              layoutId={`title-${card.bookName}-${card._id}`}
              className="font-medium text-neutral-800 dark:text-neutral-200"
            >
              {card.bookName}
            </motion.h3>
            <motion.p
              layoutId={`description-${card.price}-${card._id}`}
              className="text-neutral-600 dark:text-neutral-400"
            >
              {card.price ? `₹${Number(card.price).toLocaleString()}` : "Price not available"}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </ul>
  </div>
</div>
  
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// const cards = [
//   {
//     description: "Lana Del Rey",
//     title: "Summertime Sadness",
//     src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
//     ctaText: "Play",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           Lana Del Rey, an iconic American singer-songwriter, is celebrated for
//           her melancholic and cinematic music style. Born Elizabeth Woolridge
//           Grant in New York City, she has captivated audiences worldwide with
//           her haunting voice and introspective lyrics. <br /> <br /> Her songs
//           often explore themes of tragic romance, glamour, and melancholia,
//           drawing inspiration from both contemporary and vintage pop culture.
//           With a career that has seen numerous critically acclaimed albums, Lana
//           Del Rey has established herself as a unique and influential figure in
//           the music industry, earning a dedicated fan base and numerous
//           accolades.
//         </p>
//       );
//     },
//   },
//   {
//     description: "Babbu Maan",
//     title: "Mitran Di Chhatri",
//     src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
//     ctaText: "Play",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           Babu Maan, a legendary Punjabi singer, is renowned for his soulful
//           voice and profound lyrics that resonate deeply with his audience. Born
//           in the village of Khant Maanpur in Punjab, India, he has become a
//           cultural icon in the Punjabi music industry. <br /> <br /> His songs
//           often reflect the struggles and triumphs of everyday life, capturing
//           the essence of Punjabi culture and traditions. With a career spanning
//           over two decades, Babu Maan has released numerous hit albums and
//           singles that have garnered him a massive fan following both in India
//           and abroad.
//         </p>
//       );
//     },
//   },

//   {
//     description: "Metallica",
//     title: "For Whom The Bell Tolls",
//     src: "https://assets.aceternity.com/demos/metallica.jpeg",
//     ctaText: "Play",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           Metallica, an iconic American heavy metal band, is renowned for their
//           powerful sound and intense performances that resonate deeply with
//           their audience. Formed in Los Angeles, California, they have become a
//           cultural icon in the heavy metal music industry. <br /> <br /> Their
//           songs often reflect themes of aggression, social issues, and personal
//           struggles, capturing the essence of the heavy metal genre. With a
//           career spanning over four decades, Metallica has released numerous hit
//           albums and singles that have garnered them a massive fan following
//           both in the United States and abroad.
//         </p>
//       );
//     },
//   },
//   {
//     description: "Led Zeppelin",
//     title: "Stairway To Heaven",
//     src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
//     ctaText: "Play",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           Led Zeppelin, a legendary British rock band, is renowned for their
//           innovative sound and profound impact on the music industry. Formed in
//           London in 1968, they have become a cultural icon in the rock music
//           world. <br /> <br /> Their songs often reflect a blend of blues, hard
//           rock, and folk music, capturing the essence of the 1970s rock era.
//           With a career spanning over a decade, Led Zeppelin has released
//           numerous hit albums and singles that have garnered them a massive fan
//           following both in the United Kingdom and abroad.
//         </p>
//       );
//     },
//   },
//   {
//     description: "Mustafa Zahid",
//     title: "Toh Phir Aao",
//     src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
//     ctaText: "Play",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           &quot;Aawarapan&quot;, a Bollywood movie starring Emraan Hashmi, is
//           renowned for its intense storyline and powerful performances. Directed
//           by Mohit Suri, the film has become a significant work in the Indian
//           film industry. <br /> <br /> The movie explores themes of love,
//           redemption, and sacrifice, capturing the essence of human emotions and
//           relationships. With a gripping narrative and memorable music,
//           &quot;Aawarapan&quot; has garnered a massive fan following both in
//           India and abroad, solidifying Emraan Hashmi&apos;s status as a
//           versatile actor.
//         </p>
//       );
//     },
//   },
// ];


// const card = 