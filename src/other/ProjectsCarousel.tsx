import Carousel from "../components/Carousel";
import ClientIcon from "../components/ClientIcon";
import PlantDecoration from "../components/PlantDecoration";

import Linguini from "../assets/projects/linguini.png";
import Frijma from "../assets/projects/frijma.png";
import Alrite from "../assets/projects/alrite.png";
import Elwha from "../assets/projects/elwha.png";
import BlockScape from "../assets/projects/blockscape.png";
import CratesCraters from "../assets/projects/cratescraters.png";
import Mixify from "../assets/projects/mixify.png";

import Fern5 from "../assets/svg/fern-5.svg";
import SmallBranch3 from "../assets/svg/small-branch-3.svg";
import SmallBranch5 from "../assets/svg/small-branch-5.svg";

export default function ProjectsCarousel() {
  return (
    <Carousel
      plantDecorations={<>
        <PlantDecoration src={Fern5} top left long lazy />
        <PlantDecoration src={SmallBranch5} bottom right lazy />
        <PlantDecoration src={SmallBranch3} top right lazy />
      </>}
      numItems={7}
      animDelay="-5000ms"
      label="Project&nbsp;Highlights"
      tip="Click on project icons to learn more!"
    >
      <ClientIcon
        href="https://github.com/StefanTodoran/linguini"
        src={Linguini}
        order={1}
      />
      <ClientIcon
        href="https://github.com/StefanTodoran/frijma"
        src={Frijma}
        order={2}
      />
      <ClientIcon
        href="https://github.com/StefanTodoran/alrite-workflow-editor"
        src={Alrite}
        order={3}
        extraPadding={0.1}
      />
      <ClientIcon
        href="https://github.com/geo-smart/water-surf"
        src={Elwha}
        order={4}
        extraPadding={0.1}
      />
      <ClientIcon
        href="https://github.com/StefanTodoran/BlockScape"
        src={BlockScape}
        order={5}
        pixelArt
      />
      <ClientIcon
        href="https://play.google.com/store/apps/details?id=com.stefantodoran.cratesncraters"
        src={CratesCraters}
        order={6}
      />
      <ClientIcon
        href="https://github.com/StefanTodoran/mixify"
        src={Mixify}
        order={7}
      />
    </Carousel>
  );
}