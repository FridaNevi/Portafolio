import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectLayout from "@/components/ProjectLayout";
import { todosLosProyectos } from "@/lib/projects";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return todosLosProyectos.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = todosLosProyectos.find((p) => p.id === params.slug);
  if (!project) return { title: "Proyecto — Frida Ninel" };

  return {
    title: `${project.titulo} — Frida Ninel`,
    description: project.descripcion,
    openGraph: {
      title: `${project.titulo} — Frida Ninel`,
      description: project.descripcion,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = todosLosProyectos.find((p) => p.id === params.slug);
  if (!project) return notFound();

  return <ProjectLayout project={project} />;
}
