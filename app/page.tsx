import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { HomeGallery } from "./components/home-gallery";
import { ProjectsNavbar } from "./components/projects-navbar";

export const metadata: Metadata = {
  title: "Barakot - Admin Panel",
  description:
    "Barakot - Admin Panel bu kitob savdosi uchun hamma ishni bir joyga yig‘ib bergan sistema.",
};

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
]);

async function getGalleryImages(folderName: string) {
  const rootGalleryDir = path.join(process.cwd(), "public", "gallery");
  const projectDir = path.join(rootGalleryDir, folderName);

  try {
    const projectEntries = await readdir(projectDir, { withFileTypes: true });
    const projectImages = projectEntries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) =>
        IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()),
      )
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `/gallery/${folderName}/${encodeURIComponent(name)}`);

    if (projectImages.length > 0) {
      return projectImages;
    }

    const rootEntries = await readdir(rootGalleryDir, { withFileTypes: true });

    return rootEntries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) =>
        IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()),
      )
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `/gallery/${encodeURIComponent(name)}`);
  } catch {
    return [];
  }
}

export default async function Home() {
  const projectAccentColor = "lab(66.6158% 39.9115 67.7677)";
  const projects = [
    {
      id: "barakot-project",
      label: "Barakot Admin",
      title: "Barakot - Admin Panel",
      youtubeUrl: "https://www.youtube.com/watch?v=uCOcioA6dzk",
      intro:
        "Barakot Book sodda qilib aytganda, kitob savdosi uchun hamma ishni bir joyga yig‘ib bergan sistema.",
      features: [
        "Kassada savdo qilish",
        "Mahsulotni tez qidirish",
        "Narx-miqdor bilan ishlash",
        "Qaytarish qilish",
        "Mijoz va ta’minotchi to‘lovlarini yuritish",
        "Savdo tarixini ko‘rish",
        "Online buyurtmalarni boshqarish",
        "Yetkazish ma’lumotlari bilan ishlash",
        "Mijozlar bilan jarayonni yengilroq boshqarish",
        "Savdo + ombor + online buyurtmalarni bitta joydan boshqarish",
      ],
      folder: "Barakot",
    },
    {
      id: "barakot-online",
      label: "Barakot Online",
      title: "Barakot Online",
      youtubeUrl: undefined,
      intro:
        "Barakot Online bu kitob do‘koni uchun tayyorlangan online do‘kon bo‘lib, mijozlar saytning o‘zida to‘liq online buyurtma bera oladi.",
      features: [
        "Buyurtmalarni boshqarish",
        "Foydalanuvchilarni boshqarish",
        "Kolleksiyalar bilan ishlash",
        "Qo‘shimcha so‘rovlarni ko‘rish va nazorat qilish",
        "Qaytarish so‘rovlarini boshqarish",
        "Sharhlarni boshqarish",
        "Chegirmalarni boshqarish",
        "Promokodlarni boshqarish",
        "Sozlamalarni yagona joydan boshqarish",
        "Savdo tomoni va ichki nazoratni bitta tizimda yuritish",
      ],
      folder: "Barakot-website",
    },
    {
      id: "mojiza-toys",
      label: "Mojiza Toys",
      title: "Mojiza Toys",
      youtubeUrl: undefined,
      intro:
        "Mojiza Toys bolalar o‘yinchoqlari uchun online savdo loyihasi bo‘lib, mahsulotlarni qulay ko‘rish va buyurtma berish jarayonini soddalashtiradi.",
      features: [
        "Mahsulotlarni kategoriyalar bo‘yicha ko‘rish",
        "Yangi va ommabop o‘yinchoqlarni tez topish",
        "Buyurtma jarayonini tez va qulay bajarish",
        "Chegirma va aksiyalarni ko‘rsatish",
        "Mijozlar uchun sodda va tushunarli interfeys",
        "Online savdoni yagona tizimda boshqarish",
      ],
      folder: "Mojiza-toys",
    },
    {
      id: "qurilish",
      label: "Qurilish",
      title: "Qurilish",
      youtubeUrl: undefined,
      intro:
        "Qurilish loyihasi qurilish yo‘nalishidagi mahsulot va xizmatlarni online tarzda ko‘rsatish, buyurtma hamda aloqa jarayonlarini soddalashtirish uchun ishlab chiqilgan.",
      features: [
        "Loyiha va xizmatlarni qulay ko‘rinishda taqdim etish",
        "Mahsulot/xizmat bo‘yicha tezkor ma’lumot berish",
        "Buyurtma yoki so‘rov yuborish jarayonini yengillashtirish",
        "Mijoz bilan aloqa jarayonini soddalashtirish",
        "Kontentni yagona joydan boshqarish",
        "Online savdo va nazorat jarayonini tizimli yuritish",
      ],
      folder: "Qurilish",
    },
    {
      id: "caramel",
      label: "Caramel",
      title: "Caramel",
      youtubeUrl: undefined,
      intro:
        "Caramel loyihasi mahsulotlarni zamonaviy ko‘rinishda taqdim etish va online buyurtma jarayonini soddalashtirishga qaratilgan amaliy loyiha.",
      features: [
        "Mahsulotlarni vizual va tartibli ko‘rsatish",
        "Kategoriya bo‘yicha tez navigatsiya",
        "Online buyurtma jarayonini yengillashtirish",
        "Mijoz bilan aloqa jarayonini soddalashtirish",
        "Kontentni boshqarishni markazlashtirish",
        "Savdo va monitoringni yagona tizimda yuritish",
      ],
      folder: "Caramel",
    },
    {
      id: "phone-pos",
      label: "Phone POS",
      title: "Phone POS",
      youtubeUrl: undefined,
      intro:
        "Phone POS mobil qurilmalarda savdo jarayonlarini boshqarish uchun yaratilgan loyiha bo‘lib, tezkor operatsiyalar va qulay ishlashga yo‘naltirilgan.",
      features: [
        "Mobil qurilmada POS jarayonini yuritish",
        "Tezkor savdo va hisob-kitob",
        "Mahsulot va narx bilan qulay ishlash",
        "Buyurtma va to‘lov holatini nazorat qilish",
        "Qulay interfeys orqali tezkor foydalanish",
        "Savdo jarayonlarini bitta tizimda boshqarish",
      ],
      folder: "Phone-pos",
    },
  ] as const;
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      images: await getGalleryImages(project.folder),
    })),
  );
  const navItems = projectsWithImages.map((project) => ({
    id: project.id,
    label: project.label,
  }));

  return (
    <>
      <ProjectsNavbar items={navItems} accentColor={projectAccentColor} />

      <div className="space-y-1 bg-background">
        {projectsWithImages.map((project) => (
          <main
            key={project.id}
            id={project.id}
            className="grid grid-cols-1 items-start"
          >
            <section className="p-6 pb-2 md:pt-10 md:pb-2 md:pl-10 md:pr-5">
              <div className="space-y-3">
                <h2 className="inline-block px-1 py-1 text-3xl font-bold text-foreground md:text-4xl">
                  {project.title}
                </h2>
                <HomeGallery
                  images={project.images}
                  youtubeUrl={project.youtubeUrl}
                />
              </div>
            </section>
            <section className="px-6 pt-2 pb-6 md:pl-5 md:pr-10 md:pt-2 md:pb-10">
              <article className="h-[512px] w-full p-5 md:p-6">
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.intro}
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            </section>
          </main>
        ))}
      </div>
    </>
  );
}
