import Image from "next/image";
import { clsx } from "clsx";
import { type Project, type ProjectImage } from "@/lib/projects";
import { Reveal } from "./Reveal";

function aspectClass(aspect: ProjectImage["aspect"]) {
  switch (aspect) {
    case "4:5":
      return "aspect-[4/5]";
    case "3:4":
      return "aspect-[3/4]";
    case "16:9":
      return "aspect-[16/9]";
    case "1:1":
      return "aspect-square";
    case "3:2":
    default:
      return "aspect-[3/2]";
  }
}

function GalleryImage({
  image,
  sizes,
  priority,
}: {
  image: ProjectImage;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden bg-sandSoft",
        aspectClass(image.aspect),
      )}
      style={
        image.arched
          ? {
              borderTopLeftRadius: "50% 90px",
              borderTopRightRadius: "50% 90px",
            }
          : undefined
      }
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

export function ProjectBody({ project }: { project: Project }) {
  return (
    <div className="bg-bone">
      <div className="container-page space-y-20 pb-24 pt-20 md:space-y-28">
        {project.body.map((block, i) => {
          if (block.kind === "paragraph") {
            return (
              <Reveal key={i} className="mx-auto max-w-prose">
                <p className="text-body-lg text-ink">{block.text}</p>
              </Reveal>
            );
          }
          if (block.kind === "pullquote") {
            return (
              <Reveal key={i} className="mx-auto max-w-prose-lg text-center">
                <p className="text-h2 text-ink">
                  {block.emphasis ? (
                    block.text.split(block.emphasis).flatMap((part, idx, arr) =>
                      idx < arr.length - 1
                        ? [
                            <span key={`p-${idx}`}>{part}</span>,
                            <span
                              key={`e-${idx}`}
                              className="italic text-sand"
                            >
                              {block.emphasis}
                            </span>,
                          ]
                        : [<span key={`p-${idx}`}>{part}</span>],
                    )
                  ) : (
                    <span>{block.text}</span>
                  )}
                </p>
              </Reveal>
            );
          }
          if (block.kind === "image") {
            return (
              <Reveal key={i}>
                <GalleryImage image={block.image} sizes="100vw" />
              </Reveal>
            );
          }
          if (block.kind === "image-pair") {
            return (
              <Reveal key={i}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  {block.images.map((img, idx) => (
                    <GalleryImage
                      key={idx}
                      image={img}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  ))}
                </div>
              </Reveal>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
