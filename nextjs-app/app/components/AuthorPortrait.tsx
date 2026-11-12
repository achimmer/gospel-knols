import {stegaClean} from "@sanity/client/stega";
import {Image} from "next-sanity/image";
import {urlForImage} from "@/sanity/lib/utils";
import type {AllPostsQueryResult} from "@/sanity.types";

type Props = {author: AllPostsQueryResult[number]["author"]; className?: string};
export default function AuthorPortrait({author, className = ""}: Props) {
  const builder = urlForImage(author?.picture);
  if (!builder) return null;
  return <Image src={builder.width(200).height(200).fit("crop").url()} width={200} height={200} alt={stegaClean([author?.firstName, author?.lastName].filter(Boolean).join(" "))} className={`author-portrait ${className}`} sizes="(max-width: 640px) 96px, 160px" />;
}
