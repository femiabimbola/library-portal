interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies?: number;
  available_copies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary?: string;
  isLoanedBook?: boolean;
  createdAt?: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

interface BookCoverProps {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverUrl: string;
}