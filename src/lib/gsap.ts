import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registracija na jednom mjestu. Ranije su Hero, About, Services, Bridal,
// Gallery i Contact prosljeđivali `scrollTrigger:` a da ScrollTrigger nikad
// nisu uvezli — radilo je samo zato što ga je ScrollProvider slučajno
// registrovao prvi. Da je ScrollProvider ikad ispao iz stabla, GSAP bi
// `scrollTrigger` tretirao kao nepoznato svojstvo i sve reveal animacije bi
// odjednom opalile pri učitavanju.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
