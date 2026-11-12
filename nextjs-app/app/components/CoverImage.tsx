import {stegaClean} from "@sanity/client/stega";
import {Image} from "next-sanity/image";
import {urlForImage} from "@/sanity/lib/utils";
import type {AllPostsQueryResult} from "@/sanity.types";

type Props = {
  image: AllPostsQueryResult[number]["coverImage"];
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export default function CoverImage({image, priority = false, className = "", sizes = "(max-width: 768px) calc(100vw - 48px), 760px"}: Props) {
  const builder = urlForImage(image);
  if (!builder) return null;
  return <div className={`cover-image ${className}`}><Image fill alt={stegaClean(image?.alt || "")} src={builder.width(1280).height(720).fit("crop").url()} sizes={sizes} preload={priority} className="object-cover" /></div>;
}
