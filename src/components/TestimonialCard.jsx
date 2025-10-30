/**
 * TestimonialCard component - Displays a single testimonial with author info.
 * Can be rendered as a link or div based on href prop.
 * Features avatar, author name/handle, and testimonial text.
 * Used in marquee-style testimonials section.
 * Accessibility: Proper alt text, semantic structure.
 * Responsive: Avatar sizing with Tailwind classes.
 *
 * @param {object} props - Component props.
 * @param {object} props.author - Author object with name, handle, avatar.
 * @param {string} props.text - Testimonial text content.
 * @param {string} props.href - Optional link URL (makes card clickable).
 * @param {string} props.className - Additional CSS classes.
 * @returns {JSX.Element} The testimonial card element.
 */
import React from "react";
import { Avatar, AvatarImage } from "./Avatar"; // Import avatar components

// Utility function to join CSS classes, filtering out falsy values
const cn = (...classes) => classes.filter(Boolean).join(' ');

export function TestimonialCard({
  author, // Author object: { name, handle, avatar }
  text, // Testimonial text content
  href, // Optional link URL
  className // Additional CSS classes
}) {
  // Conditionally render as anchor or div based on href presence
  const Card = href ? 'a' : 'div';

  return (
    <Card
      // Spread link attributes if href provided
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "testimonial-card-base", // Base CSS class
        className // Additional classes
      )}
    >
      {/* Author section with avatar and info */}
      <div className="testimonial-card-author">
        <Avatar className="h-12 w-12"> {/* Avatar container with fixed size */}
          <AvatarImage src={author.avatar} alt={author.name} /> {/* Avatar image with alt text */}
        </Avatar>
        <div className="testimonial-card-author-info">
          <h3 className="text-md font-semibold leading-none"> {/* Author name */}
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground"> {/* Author handle/title */}
            {author.handle}
          </p>
        </div>
      </div>

      {/* Testimonial text content */}
      <p className="testimonial-card-text">
        {text}
      </p>
    </Card>
  );
}
