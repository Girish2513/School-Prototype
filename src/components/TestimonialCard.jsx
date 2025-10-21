import React from "react";
import { Avatar, AvatarImage } from "./Avatar";

// A simple utility for joining class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export function TestimonialCard({
  author,
  text,
  href,
  className
}) {
  const Card = href ? 'a' : 'div';

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "testimonial-card-base",
        className
      )}
    >
      <div className="testimonial-card-author">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="testimonial-card-author-info">
          <h3 className="text-md font-semibold leading-none">
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="testimonial-card-text">
        {text}
      </p>
    </Card>
  );
}