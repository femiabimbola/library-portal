import { cn } from "@/lib/utils";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png", } : BookCoverProps) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        
        className,
      )}
    >BookCover</div>
  )
}

export default BookCover