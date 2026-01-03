import Image from "next/image";

const PortableTextComponents = {
  types: {
    cloudinaryImage: ({ value }) => {
      if (!value?.url) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video">
            <Image
              src={value.url}
              alt={value.caption || "Image"}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover rounded"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-gray-600 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    youtube: ({ value }) => {
      if (!value?.url) return null;
      const getYouTubeId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
      };
      const videoId = getYouTubeId(value.url);
      if (!videoId) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-gray-600 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    gallery: ({ value }) => {
      if (!value?.images || value.images.length === 0) return null;
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
          {value.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square">
              <Image
                src={img.url}
                alt={img.alt || `Gallery image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      );
    },

    break: ({ value }) => {
      if (value?.style === "line") {
        return <hr className="my-8 border-gray-300" />;
      }
      return <div className="my-8" />;
    },
  },

  marks: {
    link: ({ children, value }) => {
      const target = value && value.blank ? "_blank" : undefined;
      const rel = value && value.blank ? "noopener noreferrer" : undefined;
      const href = value && value.href ? value.href : "#";
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className="text-[#006680] underline hover:text-[#004d5e]"
        >
          {children}
        </a>
      );
    },
    pink: ({ children }) => {
      return <span className="text-pink-600">{children}</span>;
    },
  },

  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold my-4">{children}</h3>
    ),
    normal: ({ children }) => <p className="my-4 leading-7">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#006680] pl-4 my-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
    ),
  },
};

export default PortableTextComponents;