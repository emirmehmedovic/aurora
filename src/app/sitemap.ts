import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://icecoolpro.ba";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/proizvodi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/proizvod/ice-cool-pro`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/proizvod/ice-cool-pro-max`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/proizvod/ice-cool-lite`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/naruci`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/l/ipl-aparat-protiv-dlacica`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/l/profesionalni-ipl-epilator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/l/kompaktni-ipl-uredjaj`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politika-dostave`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politika-povrata`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politika-privatnosti`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/uslovi-koristenja`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
