import Carousel from "../components/Carousel";
import ClientIcon from "../components/ClientIcon";
import PlantDecoration from "../components/PlantDecoration";

import Client1 from "../assets/clients/1.png";
import Client2 from "../assets/clients/2.png";
import Client3 from "../assets/clients/3.png";
import Client4 from "../assets/clients/4.svg";
import Client5 from "../assets/clients/5.png";
import Client6 from "../assets/clients/6.png";
import Client7 from "../assets/clients/7.png";

import CC from "../assets/clients/cc.png";
import CCalt from "../assets/clients/cc_alt.png";

import SmallBranch1 from "../assets/svg/small-branch-1.svg";
import SmallBranch2 from "../assets/svg/small-branch-2.svg";

export default function ClientCarousel() {
    return (
        <Carousel
          plantDecorations={<>
            <PlantDecoration src={SmallBranch1} top right long />
            <PlantDecoration src={SmallBranch2} bottom left />
          </>}
          label="Recent&nbsp;Clients"
          tip="Click on client logos to visit their websites!"
        >
          <ClientIcon
            href="https://dshydro.github.io/"
            src={Client1}
            order={1}
            extraPadding={0.1}
            />
          <ClientIcon
            href="https://www.soundintegrativewomens.com/"
            src={Client2}
            order={2}
            extraPadding={0.1}
            />
          <ClientIcon
            href="https://www.acupuncture-5e.com/"
            src={Client3}
            order={3}
            extraPadding={0.1}
            />
          <ClientIcon
            href="https://geo-smart.github.io/"
            src={Client4}
            order={4}
            extraPadding={0.1}
            />
          <ClientIcon
            href="https://gogleam.github.io/"
            src={Client5}
            order={5}
            />
          <ClientIcon
            href="https://www.alinahairstylist.com/"
            src={Client6}
            order={6}
            />
          <ClientIcon
            href="https://tdsw-solutions.com/"
            src={Client7}
            order={7}
            extraPadding={0.05}
            />
          <ClientIcon
            id="cc-logo"
            href="https://columbia-crossings.web.app/"
            src={CC}
            mobileSrc={CCalt}
            order={8}
            extraPadding={0.001}
          />
        </Carousel>
    );
}