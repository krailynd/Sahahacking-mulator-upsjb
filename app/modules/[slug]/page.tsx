import { notFound } from "next/navigation";
import { MODULE_DEFINITIONS, type ModuleSlug } from "@/lib/data/modules";
import { getModuleConfig } from "@/lib/data/module-config";
import { SimulationModule } from "./SimulationModule";

export function generateStaticParams() {
  return MODULE_DEFINITIONS.map((module) => ({ slug: module.slug }));
}

export const dynamicParams = false;

export default function ModulePage({ params }: { params: { slug: ModuleSlug } }) {
  const moduleDefinition = MODULE_DEFINITIONS.find((module) => module.slug === params.slug);
  const config = getModuleConfig(params.slug);
  if (!moduleDefinition || !config) {
    notFound();
  }
  return <SimulationModule moduleDefinition={moduleDefinition} config={config} />;
}
