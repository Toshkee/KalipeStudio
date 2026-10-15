import type { StaticImageData } from "next/image";
import type { Service } from "./site";

// Fotografije su od Anđele (originali, do 1440px, bez EXIF/GPS podataka) i
// sa studijskog Instagrama (@kalipe.studio i zajedničke objave sa
// @andjelajovicevic, 1080px). Statički import daje Next-u dimenzije i blur
// placeholder bez ikakvog ručnog posla.

import sminka from "@/assets/photos/sminka.jpg";
import kosa from "@/assets/photos/kosa.jpg";
import nokti from "@/assets/photos/nokti.jpg";

import mladaVeo from "@/assets/photos/mlada-veo.jpg";
import mladaJutro from "@/assets/photos/mlada-jutro.jpg";

import studioOgledala from "@/assets/photos/studio-ogledala.jpg";
import studioFrizerski from "@/assets/photos/studio-frizerski.jpg";
import studioUlaz from "@/assets/photos/studio-ulaz.jpg";
import studioLavabo from "@/assets/photos/studio-lavabo.jpg";
import studioFotelja from "@/assets/photos/studio-fotelja.jpg";
import studioOgledaloLed from "@/assets/photos/studio-ogledalo-led.jpg";

import gSminkaMore from "@/assets/photos/g-sminka-more.jpg";
import gNoktiTeget from "@/assets/photos/g-nokti-teget.jpg";
import gSminkaCrveniTop from "@/assets/photos/g-sminka-crveni-top.jpg";
import gPletenice from "@/assets/photos/g-pletenice.jpg";
import gKosaTalasiTamni from "@/assets/photos/g-kosa-talasi-tamni.jpg";
import gNoktiVisnja from "@/assets/photos/g-nokti-visnja.jpg";
import gSminkaNarandzasti from "@/assets/photos/g-sminka-narandzasti.jpg";
import gKosaBakarna from "@/assets/photos/g-kosa-bakarna.jpg";
import gNoktiMaslina from "@/assets/photos/g-nokti-maslina.jpg";
import gSminkaRep from "@/assets/photos/g-sminka-rep.jpg";
import gKosaStrana from "@/assets/photos/g-kosa-strana.jpg";
import gNoktiCrveni from "@/assets/photos/g-nokti-crveni.jpg";
import gSminkaCrvenaKosa from "@/assets/photos/g-sminka-crvena-kosa.jpg";
import gPundja from "@/assets/photos/g-pundja.jpg";
import gNoktiBordoBadem from "@/assets/photos/g-nokti-bordo-badem.jpg";
import gSminkaCrnaKosa from "@/assets/photos/g-sminka-crna-kosa.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position kad se fotografija siječe na drugi format. */
  focus?: string;
};

export const servicePhotos: Record<Service["key"], Photo> = {
  sminka: {
    src: sminka,
    alt: "Nasmijana djevojka sa šminkom toplih tonova i mekim talasima, u bordo topu",
    // Na telefonu je kartica 4:3, pa bi sredina isjekla vrh kose.
    focus: "50% 5%",
  },
  kosa: {
    src: kosa,
    alt: "Duga kosa s pramenovima, uvijena u meke talase, snimljena s leđa",
    focus: "50% 40%",
  },
  nokti: {
    src: nokti,
    alt: "Kratki zaobljeni nokti u bordo trajnom laku",
    focus: "50% 45%",
  },
};

export const bridalPhotos: Photo[] = [
  {
    src: mladaVeo,
    alt: "Mlada s kratkim velom od tila i loknama, u studiju prije vjenčanja",
    focus: "50% 25%",
  },
  {
    src: mladaJutro,
    alt: "Nasmijana mlada u bijelom satenskom bademantilu, jutro vjenčanja",
    focus: "50% 25%",
  },
];

export const studioPhotos: Photo[] = [
  {
    src: studioOgledala,
    alt: "Mjesto za šminkanje: dva lučna ogledala, polica s kozmetikom i barske stolice",
  },
  {
    src: studioFrizerski,
    alt: "Frizerski dio s lučnim ogledalima osvijetljenim po ivici i dvije frizerske stolice",
  },
  {
    src: studioUlaz,
    alt: "Ugao za nokte uz drvene police s lakovima i stakleni ulaz u studio",
  },
  {
    src: studioLavabo,
    alt: "Lavabo za pranje kose i radni sto ispred terakota luka",
  },
  {
    src: studioOgledaloLed,
    alt: "Frizerski sto s preparatima za kosu ispod ogledala sa svijetlećom ivicom",
  },
  {
    src: studioFotelja,
    alt: "Bijela bukle fotelja i orhideja kraj izloga studija",
  },
];

export type GalleryPhoto = Photo & { kind: "Šminka" | "Kosa" | "Nokti" };

/**
 * 16 = dvije kolone na telefonu, četiri od sm naviše — bez nepotpunog reda.
 * Redoslijed je složen tako da se šminka, kosa i nokti smjenjuju i u paru
 * (telefon) i u redu od četiri (desktop).
 */
export const galleryPhotos: GalleryPhoto[] = [
  { kind: "Šminka", src: gSminkaMore, alt: "Kosa skupljena u punđu i šminka uz bijelu čipkanu haljinu, kraj mora", focus: "50% 20%" },
  { kind: "Nokti", src: gNoktiTeget, alt: "Tamnoplavi nokti sa svjetlucavim trajnim lakom" },
  { kind: "Šminka", src: gSminkaCrveniTop, alt: "Nasmijana djevojka s mekim talasima i šminkom uz bordo top" },
  { kind: "Kosa", src: gPletenice, alt: "Dvije djevojčice s pletenicama i perlicama, snimljene odozgo" },
  { kind: "Kosa", src: gKosaTalasiTamni, alt: "Duga tamna kosa u velikim talasima" },
  { kind: "Nokti", src: gNoktiVisnja, alt: "Tamni nokti boje višnje na kamenoj podlozi" },
  { kind: "Šminka", src: gSminkaNarandzasti, alt: "Svečana šminka i plavi pramenovi uz narandžasti sako" },
  { kind: "Kosa", src: gKosaBakarna, alt: "Duga bakarnosmeđa kosa u talasima" },
  { kind: "Nokti", src: gNoktiMaslina, alt: "Maslinasto zeleni i nude nokti uz bočicu HEYLOVE laka" },
  { kind: "Šminka", src: gSminkaRep, alt: "Zalizana kosa skupljena u nizak rep i šminka s izraženim obrvama" },
  { kind: "Kosa", src: gKosaStrana, alt: "Kosa skupljena na stranu s loknom ispred uha" },
  { kind: "Nokti", src: gNoktiCrveni, alt: "Crveni sjajni nokti zaobljenog oblika" },
  { kind: "Šminka", src: gSminkaCrvenaKosa, alt: "Šminka i riđa kosa skupljena na jednu stranu" },
  { kind: "Kosa", src: gPundja, alt: "Visoka punđa i nježna šminka za maturu" },
  { kind: "Nokti", src: gNoktiBordoBadem, alt: "Bordo nokti bademastog oblika" },
  { kind: "Šminka", src: gSminkaCrnaKosa, alt: "Duga crna kosa u talasima i topla šminka" },
];
