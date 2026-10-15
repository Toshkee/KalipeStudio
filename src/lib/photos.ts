import type { StaticImageData } from "next/image";
import type { Service } from "./site";

// Sve fotografije su sa studijskog Instagrama (@kalipe.studio i zajedničkih
// objava sa @andjelajovicevic), preuzete u 1080px. Statički import daje
// Next-u dimenzije i blur placeholder bez ikakvog ručnog posla.

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

import gSminkaCrvenaKosa from "@/assets/photos/g-sminka-crvena-kosa.jpg";
import gNoktiCrveni from "@/assets/photos/g-nokti-crveni.jpg";
import gPundja from "@/assets/photos/g-pundja.jpg";
import gPletenice from "@/assets/photos/g-pletenice.jpg";
import gKosaBakarna from "@/assets/photos/g-kosa-bakarna.jpg";
import gNoktiVisnja from "@/assets/photos/g-nokti-visnja.jpg";
import gSminkaTalasi from "@/assets/photos/g-sminka-talasi.jpg";
import gNoktiMaslina from "@/assets/photos/g-nokti-maslina.jpg";
import gKosaPlava from "@/assets/photos/g-kosa-plava.jpg";
import gNoktiBordoBadem from "@/assets/photos/g-nokti-bordo-badem.jpg";
import gSminkaRep from "@/assets/photos/g-sminka-rep.jpg";
import gNoktiNude from "@/assets/photos/g-nokti-nude.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position kad se fotografija siječe na drugi format. */
  focus?: string;
};

export const servicePhotos: Record<Service["key"], Photo> = {
  sminka: {
    src: sminka,
    alt: "Večernja šminka i kosa skupljena u talasast rep, ispred osvijetljenog ogledala u studiju",
    focus: "50% 30%",
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

export const galleryPhotos: GalleryPhoto[] = [
  { kind: "Šminka", src: gSminkaCrvenaKosa, alt: "Šminka i riđa kosa skupljena na jednu stranu" },
  { kind: "Nokti", src: gNoktiCrveni, alt: "Crveni sjajni nokti zaobljenog oblika" },
  { kind: "Kosa", src: gPundja, alt: "Visoka punđa i nježna šminka za maturu" },
  { kind: "Kosa", src: gPletenice, alt: "Dvije djevojčice s pletenicama i perlicama, snimljene odozgo" },
  { kind: "Kosa", src: gKosaBakarna, alt: "Duga bakarnosmeđa kosa u talasima" },
  { kind: "Nokti", src: gNoktiVisnja, alt: "Tamni nokti boje višnje na kamenoj podlozi" },
  { kind: "Šminka", src: gSminkaTalasi, alt: "Topla šminka i kosa s pramenovima u velikim talasima" },
  { kind: "Nokti", src: gNoktiMaslina, alt: "Maslinasto zeleni i nude nokti uz bočicu HEYLOVE laka" },
  { kind: "Kosa", src: gKosaPlava, alt: "Plava kosa s tamnijim korijenom, uvijena u talase" },
  { kind: "Nokti", src: gNoktiBordoBadem, alt: "Bordo nokti bademastog oblika" },
  { kind: "Šminka", src: gSminkaRep, alt: "Zalizana kosa skupljena u nizak rep i šminka s izraženim obrvama" },
  { kind: "Nokti", src: gNoktiNude, alt: "Nude roze nokti na bijeloj vunenoj podlozi" },
];
