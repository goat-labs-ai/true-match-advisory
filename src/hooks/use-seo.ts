import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
}

export const useSeo = ({ title, description }: SeoProps) => {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      meta.setAttribute("content", description);
      document.head.appendChild(meta);
    }

    return () => {
      document.title = "TrueMatch Advisory | Executive Search i Rekrutacja Managerów";
    };
  }, [title, description]);
};
