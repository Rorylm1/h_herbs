/**
 * LatinName — Typography utility for rendering Latin botanical names.
 *
 * Ensures all Latin names across the site use the same italic serif treatment
 * (Cormorant Garamond italic) for visual consistency and that apothecary feel.
 *
 * Usage:
 *   <LatinName name="Matricaria recutita" />
 *   <LatinName name="Sambucus nigra" className="text-base" />
 */

interface LatinNameProps {
  name: string;
  className?: string;
}

export default function LatinName({ name, className = "" }: LatinNameProps) {
  return (
    <span className={`latin-name text-muted/80 text-sm ${className}`}>
      {name}
    </span>
  );
}
