import type { Metadata } from "next";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

import { HomeGallery } from "./components/home-gallery";
import { ProjectsNavbar } from "./components/projects-navbar";

export const metadata: Metadata = {
  title: "Bizneslar uchun yechimlar",
  description:
    "Bu sahifada biz clientlar uchun qilgan amaliy loyihalar jamlangan. Sizning biznesingiz uchun ham shunga o'xshash tizimlarni talabingizga moslab tayyorlab beramiz.",
  keywords: [
    "loyihalar",
    "biznes uchun tizimlar",
    "xizmat taklifi",
    "Admin Panel",
    "Online do'kon",
    "Mobil ilova",
    "CRM",
    "Biznes tizimlari",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bizneslar uchun yechimlar",
    description:
      "Biz qilgan loyihalar namunalari va xizmat taklifi: sizga ham shunga o'xshash tizimlar yaratib beramiz.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bizneslar uchun yechimlar",
    description:
      "Biznes uchun admin panel, online do'kon, mobil ilova va boshqa tizimlar loyihalari sahifasi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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

type Project = {
  id: string;
  label: string;
  title: string;
  folder: string;
  intro: string;
  features: string[];
  youtubeUrl?: string;
  maxImages?: number;
  mainImage?: string;
  useNaturalImageSize?: boolean;
};

async function getGalleryImages(folderName: string) {
  const rootGalleryDir = path.join(process.cwd(), "public", "gallery");
  const projectDir = path.join(rootGalleryDir, folderName);
  const sortByNewestFirst = <T extends { name: string; mtimeMs: number }>(
    a: T,
    b: T,
  ) => b.mtimeMs - a.mtimeMs || a.name.localeCompare(b.name);

  try {
    const projectEntries = await readdir(projectDir, { withFileTypes: true });
    const projectImageNames = projectEntries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()));
    const projectImagesWithMeta = await Promise.all(
      projectImageNames.map(async (name) => ({
        name,
        mtimeMs: (await stat(path.join(projectDir, name))).mtimeMs,
      })),
    );
    const projectImages = projectImagesWithMeta
      .sort(sortByNewestFirst)
      .map((image) => `/gallery/${folderName}/${encodeURIComponent(image.name)}`);

    if (projectImages.length > 0) {
      return projectImages;
    }

    const rootEntries = await readdir(rootGalleryDir, { withFileTypes: true });

    const rootImageNames = rootEntries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()));
    const rootImagesWithMeta = await Promise.all(
      rootImageNames.map(async (name) => ({
        name,
        mtimeMs: (await stat(path.join(rootGalleryDir, name))).mtimeMs,
      })),
    );

    return rootImagesWithMeta
      .sort(sortByNewestFirst)
      .map((image) => `/gallery/${encodeURIComponent(image.name)}`);
  } catch {
    return [];
  }
}

export default async function Home() {
  const projectAccentColor = "lab(66.6158% 39.9115 67.7677)";
  const projects: Project[] = [
    {
      id: "barakot-project",
      label: "Barakot Admin",
      title: "Barakot - Admin Panel",
      youtubeUrl: "https://youtu.be/RbL_JjKdoyk",
      intro:
        "Barakot - Admin Panel bu Barakot kitob do‘koni uchun 1C dasturi o‘rniga yaratilgan zamonaviy boshqaruv tizimi. Do‘konning kundalik ishlarini soddalashtirib, hamma jarayonni bitta joyda tartibli yuritishga yordam beradi.",
      features: [
        "Mahsulotlar bilan to‘liq ishlash: kirim, chiqim, narx va qoldiqni nazorat qilish",
        "Ta’minotchilar va xaridorlar bilan hisob-kitoblarni tartibli yuritish",
        "Qarz oldi-berdi jarayonlarini tizimli boshqarish",
        "Filiallarni bitta tizim orqali boshqarish",
        "Online do‘kondan tushgan buyurtmalarni nazorat qilish",
        "Ishchi-hodimlar faoliyatini kuzatish va boshqarish",
        "Kirim-chiqim, to‘lovlar va umumiy moliyaviy hisobotlarni bir joyda ko‘rish",
        "Mobile ilova va website bilan bog‘liq ishlaydigan yagona ekotizim",
        "Shunga o‘xshash tizimni sizning biznesingizga moslab tayyorlab beramiz",
      ],
      folder: "Barakot",
    },
    {
      id: "barakot-online",
      label: "Barakot - Online Do'kon",
      title: "Barakot - Online Do'kon",
      youtubeUrl: "https://www.youtube.com/watch?v=wejAt6KID_Q",
      intro:
        "Barakot - Online Do'kon bu kitob do‘koni uchun yaratilgan online savdo tizimi. Savdo jarayonlari, buyurtmalar va mijoz bilan ishlash bitta joyda qulay boshqariladi.",
      features: [
        "Kitoblarni online sotish uchun to‘liq tayyor tizim",
        "Buyurtma, to‘lov va yetkazib berish jarayonlarini bir joyda yuritish",
        "Mijozga qulay va tushunarli online xarid tajribasi",
        "Chegirma va aksiyalar bilan savdoni qo‘llab-quvvatlash",
        "Savdo holatini tartibli nazorat qilish va umumiy natijani kuzatish",
        "Shunga o‘xshash online do‘konni sizning biznesingizga moslab tayyorlab beramiz",
      ],
      folder: "Barakot-website",
    },
    {
      id: "barakot-app",
      label: "Barakot - Mobil ilova",
      title: "Barakot - Mobil ilova",
      youtubeUrl: "https://youtu.be/fN35GoRjhVo",
      mainImage: "/gallery/barakot-app/IMAGE%202026-04-18%2008%3A27%3A37.jpg",
      useNaturalImageSize: true,
      intro:
        "Barakot App bu kitob do‘koni uchun mobil ilova loyihasi bo‘lib, mijozlarga buyurtma berish va do‘kon bilan ishlashni telefon orqali yanada qulay qiladi.",
      features: [
        "Mahsulotlarni mobil ilovada qulay ko‘rish va tanlash",
        "Buyurtma jarayonini tez va oson yakunlash",
        "Mijozlar uchun sodda va tushunarli interfeys",
        "Online do‘kon bilan birga ishlaydigan yagona tizim",
        "Savdo jarayonini telefon orqali ham faol yuritish",
        "Shunga o‘xshash mobil ilovani sizning biznesingizga moslab tayyorlab beramiz",
      ],
      folder: "barakot-app",
    },
    {
      id: "mojiza-toys",
      label: "Mojiza Toys",
      title: "Mojiza Toys",
      youtubeUrl: undefined,
      intro:
        "Mojiza Toys bu o‘yinchoq do‘koni uchun tayyorlangan boshqaruv tizimi. Savdo, o‘yinchoq tayyorlash uchun qismlar, ta’minotchilar bilan hisob-kitob va umumiy hisobotlar bitta joyda yuritiladi.",
      features: [
        "Sotuv va sotuv tarixini kunlik, haftalik, oylik kesimda ko‘rish",
        "Xomashyo va yarim tayyor mahsulot zaxirasini nazorat qilish",
        "O‘yinchoq tayyorlash uchun kerakli qismlarni oldindan rejalash va buyurtma bilan ishlash",
        "Ta’minotchilar bilan ishlash va to‘lov/qarz holatini kuzatish",
        "Mijozlar va qarzdorlik bo‘yicha ma’lumotlarni tartibli boshqarish",
        "Shunga o‘xshash tizimni sizning do‘koningizga moslab tayyorlab beramiz",
      ],
      folder: "Mojiza-toys",
    },
    {
      id: "qurilish",
      label: "Qurilish",
      title: "Qurilish",
      youtubeUrl: undefined,
      intro:
        "Qurilish bu qurilish korxonalari uchun tayyorlangan boshqaruv tizimi. Unda qurayotgan binolaringizni ro‘yxatga olib, kvartiralarni sotish va barcha jarayonlarni bitta joyda tartibli boshqarish mumkin.",
      features: [
        "Loyiha maydonlarini ochib, har bir obyekt va binoni alohida yuritish",
        "Bino, blok, qavat va kvartiralarni tez kiritish yoki avtomatik shakllantirish",
        "Kvartira holatlarini bir joyda ko‘rish: bo‘sh, band qilingan, shartnoma, sotilgan",
        "Kvartiralarni narx, maydon va holat bo‘yicha qulay qidirish va saralash",
        "Mijozlar bilan ishlash va shartnoma jarayonlarini tizimli boshqarish",
        "Shunga o‘xshash tizimni sizning qurilish loyihangizga moslab tayyorlab beramiz",
      ],
      folder: "Qurilish",
    },
    {
      id: "caramel",
      label: "Caramel",
      title: "Caramel",
      youtubeUrl: undefined,
      intro:
        "Caramel bu shirinlik va qandolat do‘konlari uchun tayyorlangan amaliy tizim. Do‘konning kundalik savdo jarayonlari bitta joyda tartibli va qulay boshqariladi.",
      features: [
        "Savdo va buyurtmalarni bitta tizimda yuritish",
        "Kassa va to‘lov jarayonlarini qulay boshqarish",
        "Kundalik ishlar bo‘yicha aniq va tushunarli hisobotlarni ko‘rish",
        "Jamoa bilan ishlashni tartibli yo‘lga qo‘yish",
        "Biznesdagi pul aylanmasini nazorat qilishni osonlashtirish",
        "Shunga o‘xshash tizimni sizning ish uslubingizga moslab tayyorlab beramiz",
      ],
      folder: "Caramel",
    },
    {
      id: "phone-pos",
      label: "Telfon do'konlari uchun tizim",
      title: "Telfon do'konlari uchun tizim",
      youtubeUrl: "https://youtu.be/rrgpf8gQbTw",
      intro:
        "Phone POS bu telefon do‘konlari uchun tayyorlangan boshqaruv tizimi. Savdo, kassa, muddatli to‘lov, ishchilar oyligi va umumiy foyda-hisoblarni bitta joyda tartibli yuritish mumkin.",
      features: [
        "Telefon savdosini tez va aniq yuritish",
        "Kassa kirim-chiqimlarini nazorat qilish",
        "Telefonni muddatli to‘lovga berish jarayonini boshqarish",
        "Ishchilar oyligini hisoblash va kuzatish",
        "Umumiy savdo, xarajat va foyda hisobotlarini ko‘rish",
        "Shunga o‘xshash tizimlarni sizning talablarga moslab noldan tayyorlab beramiz",
      ],
      folder: "Phone-pos",
    },
    {
      id: "landing-pages",
      label: "Reklama uchun websitelar",
      title: "Reklama uchun websitelar",
      youtubeUrl: undefined,
      intro:
        "Bu bo‘limda biz mijozlar uchun tayyorlagan bir sahifalik sayt namunalarini ko‘rasiz. Maqsad oddiy: biznesingizni chiroyli ko‘rsatish va xaridorni tez bog‘lanishga olib kelish.",
      features: [
        "Har xil yo‘nalish uchun bir sahifalik sayt: o‘quv kursi, internet do‘kon, xizmat ko‘rsatish, restoran, klinika va boshqalar",
        "Biznesingizga mos ko‘rinish: rang, uslub va matnlar sizning yo‘nalishingizga qarab tayyorlanadi",
        "Mijozni qo‘ng‘iroq yoki buyurtmaga olib keladigan aniq tugmalar",
        "Telefon va kompyuterda birdek chiroyli ko‘rinadigan moslashuvchan sahifalar",
        "Tez ochiladigan, sodda va tushunarli struktura",
        "Agar mahsulot yoki xizmatingizni zamonaviy sayt orqali ko‘rsatmoqchi bo‘lsangiz, bizga murojaat qiling",
      ],
      folder: "landing-pages",
    },
    {
      id: "telegram-bots",
      label: "Telegram Bots",
      title: "Telegram Bots",
      youtubeUrl: undefined,
      maxImages: 4,
      intro:
        "Telegram bot orqali biznesingizdagi ko‘p ishlarni ancha yengillashtirish mumkin. Biz sizning yo‘nalishingizga mos bot tayyorlab, mijoz bilan ishlashni tez va tartibli qilamiz.",
      features: [
        "Online do‘kon uchun: mahsulot tanlash, buyurtma qoldirish va holatini tekshirish",
        "O‘quv markaz uchun: kurslar haqida ma’lumot, ro‘yxatdan o‘tish va dars eslatmalari",
        "Xizmat ko‘rsatish biznesi uchun: navbatga yozilish, vaqt bron qilish va tasdiqlash xabarlari",
        "Restoran yoki kafe uchun: menyuni ko‘rish, buyurtma berish va yetkazib berish ma’lumotlari",
        "Sotuv jamoasi uchun: mijoz so‘rovlarini yig‘ish va operatorga avtomatik taqsimlash",
        "Agar siz ham Telegram orqali savdo yoki xizmatni kuchaytirmoqchi bo‘lsangiz, bizga murojaat qiling",
      ],
      folder: "telegram-bots",
    },
  ];
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      images: await getGalleryImages(project.folder),
    })),
  );
  const navItems = projectsWithImages.map((project) => ({
    id: project.id,
    label: project.label,
    title: project.title,
  }));
  const projectsWithoutVideoSlot = new Set([
    "landing-pages",
    "telegram-bots",
    "barakot-app",
  ]);

  return (
    <>
      <ProjectsNavbar
        items={navItems}
        accentColor={projectAccentColor}
        defaultTitle="Bizneslar uchun yechimlar"
      />

      <div className="space-y-0 bg-background">
        {projectsWithImages.map((project) => (
          <main
            key={project.id}
            id={project.id}
            className="grid grid-cols-1 items-start pb-2 md:pb-3"
          >
            <section className="p-6 pb-2 md:pt-6 md:pb-2 md:pl-10 md:pr-5">
              <div className="space-y-3">
                <h2 className="inline-block px-1 py-1 text-3xl font-bold text-foreground md:text-4xl">
                  {project.title}
                </h2>
                <HomeGallery
                  images={project.images}
                  youtubeUrl={project.youtubeUrl}
                  maxImages={project.maxImages}
                  showVideoSlot={!projectsWithoutVideoSlot.has(project.id)}
                  mainImage={project.mainImage}
                  useNaturalImageSize={project.useNaturalImageSize}
                />
              </div>
            </section>
            <section className="px-6 pt-2 pb-2 md:pl-5 md:pr-10 md:pt-2 md:pb-3">
              <article className="w-full p-5 md:p-6">
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
