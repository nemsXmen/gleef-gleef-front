
"use client";import useProjects from "@/composables/projects/hooks/useProjects";

export default function ProjectList() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {projects?.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}