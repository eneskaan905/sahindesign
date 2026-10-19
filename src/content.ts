import content from './content.json'

export type Project = { title: string; category: string; image: string; label: string }
export type Service = { number: string; title: string; description: string; icon: string }
export type SiteContent = {
  brand: string; phone: string; heroEyebrow: string; heroTitle: string; heroText: string
  services: Service[]; projects: Project[]
}

export const defaultContent = content as SiteContent

