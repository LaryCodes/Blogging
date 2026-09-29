import { CalendarIcon, ClockIcon } from "@/components/Icons";
import { formatDate, formatReadTime } from "@/utils";

interface PostMetaProps {
  date: string;
  readTime: number;
  className?: string;
}

/** Inline date + reading-time metadata row used on cards and detail pages. */
export function PostMeta({ date, readTime, className = "" }: PostMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500 ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarIcon className="h-4 w-4" />
        <time dateTime={date}>{formatDate(date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon className="h-4 w-4" />
        {formatReadTime(readTime)}
      </span>
    </div>
  );
}
