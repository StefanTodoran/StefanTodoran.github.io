// COMPONENTS & FUNCTIONS
import Menu from "./components/Menu";
import SectionBreak from "./components/SectionBreak";
import PlantDecoration from "./components/PlantDecoration";
import LeavesGenerator from "./components/LeavesGenerator";
import Section from "./components/Section";
import Footer from "./other/Footer";
import Title from "./components/Title";
import { scrollToHref, scrollToTop } from "./utils/utils";

// SHORTHANDS
import PageTopPlants from "./other/PageTopPlants";
import IntroButtons from "./other/IntroButtons";

// STYLES
import "./App.sass";
import "./Misc.sass";

// SVGS
import LargeShrub from "./assets/svg/large-shrub.svg";
import SmallShrubs from "./assets/svg/small-shrubs.svg";
import TinyShrubs from "./assets/svg/tiny-shrubs.svg";
import Shrubs2 from "./assets/svg/shrubs-2.svg";
import Sprouts from "./assets/svg/sprouts.svg";
import FernClump from "./assets/svg/fern-clump.svg";
import FanLeaves1 from "./assets/svg/fan-leaves-1.svg";
import FanLeaves2 from "./assets/svg/fan-leaves-2.svg";
import FanLeaves3 from "./assets/svg/fan-leaves-3.svg";
import SmallBranch3 from "./assets/svg/small-branch-3.svg";
import SmallBranch4 from "./assets/svg/small-branch-4.svg";

// @ts-ignore We load it to make sure there is no stutter when hovering.
import BackToTopHover from "./assets/svg/back-to-top_hover.svg";
import BackToTop from "./assets/svg/back-to-top.svg";

import Branch1 from "./assets/svg/branch-1.svg";
import Branch2 from "./assets/svg/branch-2.svg";
import Branch3 from "./assets/svg/branch-3.svg";

// IMAGES
import Freelance1 from "./assets/freelance_1.png";
import Freelance1a from "./assets/freelance_1a.png";
import Freelance2 from "./assets/freelance_2.png";
import Freelance2a from "./assets/freelance_2a.png";
import Technivision from "./assets/technivision.gif";
import Linguini2 from "./assets/linguini_2.png";
import CratesCraters from "./assets/crates_n_craters.png";
import Mashup from "./assets/svg/mashup.svg";
import ClientCarousel from "./other/ClientCarousel";

function App() {
  const gotoContact = () => {
    window.dispatchEvent(new Event("openContactForm"));
    scrollToTop();
  };

  const getInContact = <a
    className="clickable title small"
    tabIndex={0}
    onClick={gotoContact}
    onKeyDown={gotoContact}
  >
    Click here
  </a>;

  return (
    <>
      {/* <Loader/> */}
      <div className="grain active"></div>

      <Menu callbacks={[
        () => scrollToTop(),
        () => scrollToHref("freelance-section"),
        () => scrollToHref("projects-section"),
        () => scrollToHref("contact-section"),
      ]} />

      <div id="wrapper">
        <PageTopPlants />
        <LeavesGenerator leafCount={3} spawnDelay={[3, 7]} gustFrequency={[0, 10]}/>
        {/* <LeavesGenerator leafCount={20} spawnDelay={[3, 7]} gustFrequency={[0, 10]}/> */}

        <Section
          id="intro-section"
          branchSrc={Branch3}
          parallaxContent={<IntroButtons />}
          inverse
        >
          <Title customClass="line-height-fix">Hey There!</Title>
          <p>
            I'm Stefan, a computer science graduate from the University of Washington with a passion for web, mobile, and game
            design. I also interested in machine learning and computer vision. Scroll down to learn about some of my work!
          </p>
        </Section>

        <SectionBreak id="freelance-section">
          <PlantDecoration src={Sprouts} top left />
          <PlantDecoration src={FanLeaves1} bottom right long />
        </SectionBreak>

        <Section
          branchSrc={Branch1}
          plantDecorations={
            <PlantDecoration src={FanLeaves2} bottom left long customClass="mobile-vertical-fix" />
          }
          parallaxContent={<>
            <img className="parallax-content long-version" src={Freelance1} />
            <img className="parallax-content short-version" src={Freelance1a} />
          </>}
        >
          <Title href="#intro" mobile="Origins">Web Design Origins</Title>
          <p className="long-version">
            My first foray into web design started in 2019 shortly after first learning to code, when I built a website
            for my mom's small business. Although I had never expected my work to serve as anything more than as a way to
            attract customers to my mom's business, the site attracted the attention of many of her colleagues and other
            local business owners and before I knew it I had requests coming in from all over!
          </p>
          <p className="short-version">
            I had my first foray into web design building a website for my mother's small business. Many of her colleagues
            and other local business owners saw the website I had built and before I knew it I had requests coming in from
            all over!
          </p>
        </Section>

        <ClientCarousel />
        <SectionBreak />

        <Section
          branchSrc={Branch2}
          plantDecorations={<>
            <PlantDecoration src={TinyShrubs} top right />
            <PlantDecoration src={Shrubs2} bottom right />
          </>}
          parallaxContent={<>
            <img className="parallax-content inverse long-version" src={Freelance2} />
            <img className="parallax-content inverse short-version" src={Freelance2a} />
          </>}
          inverse
        >
          <Title href="#freelance" mobile="Freelance">Freelance Web&nbsp;Design</Title>
          <p className="long-version">
            As I've developed my web design skills, both through work experience and through the Paul Allen School, I've
            started to actively seek out more clients. Not only is my freelance work a great opportunity to practice
            programming, it is also an opportunity to support local businesses which might find other website services to
            be both prohibitively expensive and lacking sufficient customization to warrant their price.
          </p>
          <p className="short-version">
            As I've developed my web design skills, I've started to actively seek out more clients.
            Not only is my freelance work a great learning opportunity, it is also an opportunity to support local
            business.
          </p>
        </Section>

        <SectionBreak id="projects-section">
          <PlantDecoration src={LargeShrub} left long />
        </SectionBreak>

        <Section
          branchSrc={Branch3}
          plantDecorations={<PlantDecoration src={SmallBranch3} bottom right />}
          parallaxContent={<img className="parallax-content" src={Technivision} loading="lazy" />}
        >
          <Title href="https://www.youtube.com/watch?v=tSOshI3OD_Q" customClass="tiny-width-fix">Technivision</Title>
          <p className="long-version">
            A “personal trainer in your pocket” hybrid mobile app that aims to help users achieve safer, more effective
            workouts. By utilizing computer vision and pose estimation, Technivision can provide individualized feedback
            on their exercise technique.
          </p>
          <p className="short-version">
            A “personal trainer in your pocket” mobile app that helps users achieve safer, more effective workouts.
            Utilizing computer vision and pose estimation, provides individualized feedback on exercise technique.
          </p>
        </Section>

        <SectionBreak />

        <Section
          branchSrc={Branch1}
          plantDecorations={<PlantDecoration src={FanLeaves3} top left long />}
          parallaxContent={
            <img className="parallax-content inverse tiny-width-fix" src={Linguini2} />
          }
          inverse
        >
          <Title href="https://www.youtube.com/watch?v=HCLEnS05A-s" target="_blank">Linguini</Title>
          <p className="long-version">
            A light-weight browser extension designed to help you translate words and phrases at the press of a button.
            Its sleek, low-profile interface seamlessly integrates into chrome; you won't notice it when you don't need to
            use it. Created with language learners in mind, linguini offers multiple translations to help users find
            deeper understanding and assist learning.
          </p>
          <p className="short-version tiny-width-fix">
            A light-weight chrome extension created with language learners in mind, linguini offers multiple translations
            to help users find deeper understanding and assist learning.
          </p>
        </Section>

        <SectionBreak>
          <PlantDecoration src={SmallShrubs} top left />
          <PlantDecoration src={FernClump} bottom right long />
        </SectionBreak>

        <Section
          branchSrc={Branch2}
          parallaxContent={<img className="parallax-content" src={CratesCraters} />}
        >
          <Title href="https://play.google.com/store/apps/details?id=com.stefantodoran.cratesncraters">Crates & Craters</Title>
          <p className="long-version">
            A passion project of mine, Crates and Craters is a single player puzzle game built for iOS and Android. Don't
            let the simple premise and minimalist graphics decieve you, the game's mechanics compound on each other to
            create challenging and layered gameplay! <a className="clickable title small" href="https://play.google.com/store/apps/details?id=com.stefantodoran.cratesncraters" target="_blank">
              Click here</a> to give it a try it yourself!
          </p>
          <p className="short-version">
            A passion project of mine, Crates and Craters is a single player puzzle game a simple premise and minimalist
            graphics, but challenging and layered gameplay! <a className="clickable title small" href="https://play.google.com/store/apps/details?id=com.stefantodoran.cratesncraters" target="_blank">
              Click here</a> to give it a try it yourself!
          </p>
        </Section>

        <SectionBreak id="contact-section">
          <PlantDecoration src={SmallBranch4} id="plant-2" top right long />
        </SectionBreak>

        <Section
          branchSrc={Branch3}
          plantDecorations={<PlantDecoration src={BackToTop} id="back-to-top" top left long onClick={scrollToTop} />}
          parallaxContent={<img className="parallax-content inverse" src={Mashup} />}
          inverse
        >
          <Title href="#collaborate" mobile="Collaborate">Work With Me</Title>
          <p className="long-version">
            Whether you are looking to hire the freelancer who will build your dream website, need a designer to draw you
            up some vector graphics, or just want to collaborate on a project for fun, throw me line, I'd love to work
            with you! {getInContact} to get in contact with me!
          </p>
          <p className="short-version">
            Whether you are looking for a web developer, graphic designer, or just want to collaborate on a project for
            fun, I'd love to work with you! {getInContact} to get in contact with me!
          </p>
        </Section>

        <Footer />
      </div>

      <div className="vignette"></div>
    </>
  )
}

export default App;