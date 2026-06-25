"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { shelfRows, type ShelfBook } from "@/data/shelf-books";
import "./Bookshelf.css";

function spineAuthorName(author: string) {
  const primary = author.split("&")[0]?.trim() ?? author;
  const parts = primary.split(" ");
  return parts[parts.length - 1] ?? author;
}

function BookOnShelf({
  book,
  isActive,
  onHover,
}: {
  book: ShelfBook;
  isActive: boolean;
  onHover: (book: ShelfBook) => void;
}) {
  return (
    <button
      type="button"
      className={cn("bookshelf-book", isActive && "bookshelf-book--active")}
      style={
        {
          "--book-thickness": `${book.thickness}px`,
          "--book-height": `${book.height}px`,
          "--spine-color": book.spineColor,
        } as React.CSSProperties
      }
      aria-label={`${book.title} by ${book.author}`}
      onMouseEnter={() => onHover(book)}
      onFocus={() => onHover(book)}
    >
      <div className="bookshelf-book-body">
        <div className="bookshelf-book-spine">
          <span className="bookshelf-spine-title">{book.spineLabel}</span>
          <span className="bookshelf-spine-author">
            {spineAuthorName(book.author)}
          </span>
        </div>
        <div className="bookshelf-book-cover">
          <Image
            src={book.cover}
            alt=""
            width={140}
            height={220}
            sizes="140px"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bookshelf-book-pages" aria-hidden />
        <div className="bookshelf-book-top" aria-hidden />
      </div>
    </button>
  );
}

function ShelfRow({
  books,
  activeId,
  onHover,
}: {
  books: ShelfBook[];
  activeId: string | null;
  onHover: (book: ShelfBook) => void;
}) {
  return (
    <div className="bookshelf-row-wrap">
      <div className="bookshelf-row">
        {books.map((book) => (
          <BookOnShelf
            key={book.id}
            book={book}
            isActive={activeId === book.id}
            onHover={onHover}
          />
        ))}
      </div>
    </div>
  );
}

function BookPreview({ book }: { book: ShelfBook | null }) {
  return (
    <aside
      className={cn("bookshelf-preview", book && "bookshelf-preview--active")}
      aria-live="polite"
    >
      {book ? (
        <div className="bookshelf-preview-inner">
          <div className="bookshelf-preview-cover">
            <Image
              src={book.cover}
              alt={`Cover of ${book.title}`}
              width={220}
              height={330}
              sizes="220px"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="bookshelf-preview-text">
            <h3 className="bookshelf-preview-title">{book.title}</h3>
            <p className="bookshelf-preview-author">{book.author}</p>
            <p className="bookshelf-preview-desc">{book.description}</p>
          </div>
        </div>
      ) : (
        <div className="bookshelf-preview-empty">
          <p className="bookshelf-preview-placeholder">
            Hover a book on the shelf
          </p>
          <p className="bookshelf-preview-hint">
            Cover, author, and a note on why it&apos;s here will appear in this
            panel.
          </p>
        </div>
      )}
    </aside>
  );
}

export function Bookshelf({ className }: { className?: string }) {
  const [activeBook, setActiveBook] = useState<ShelfBook | null>(null);

  return (
    <figure className={cn("bookshelf", className)}>
      <div
        className="bookshelf-layout"
        onMouseLeave={() => setActiveBook(null)}
      >
        <div className="bookshelf-shelf-col">
          <div className="bookshelf-frame">
            <div className="bookshelf-inner">
              <div className="bookshelf-back" aria-hidden />
              <div className="bookshelf-scene">
                {shelfRows.map((row, i) => (
                  <div key={i}>
                    <ShelfRow
                      books={row}
                      activeId={activeBook?.id ?? null}
                      onHover={setActiveBook}
                    />
                    <div className="bookshelf-plank" aria-hidden />
                  </div>
                ))}
              </div>
              <div className="bookshelf-plank-face" aria-hidden />
            </div>
          </div>
        </div>

        <BookPreview book={activeBook} />
      </div>

      <figcaption className="bookshelf-caption font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
        {shelfRows.flat().length} books and counting · hover to preview
      </figcaption>
    </figure>
  );
}
