
import PortableText from "@/app/components/PortableText";
import { InfoSection } from "@/sanity.types";

type InfoProps = {
  block: InfoSection;
  index: number;
};

export default function CTA({ block }: InfoProps) {
  return (
    <div className="cms-info-section">
      <div className="cms-info-content">
        {block?.heading && (
          <h2 className="cms-info-heading">
            {block.heading}
          </h2>
        )}
        {block?.subheading && (
          <span className="cms-info-subheading">
            {block.subheading}
          </span>
        )}
        <div className="mt-4">
          {block?.content?.length && (
            <PortableText
              className="reading-prose cms-page-prose"
              value={block.content}
            />
          )}
        </div>
      </div>
    </div>
  );
}
