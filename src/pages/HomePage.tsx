import { Link as RouterLink } from 'react-router-dom'
import { Container } from '../foundation/Container'
import { Heading } from '../foundation/Heading'
import { Text } from '../foundation/Text'
import { HeroTagline } from '../components/HeroTagline'
import { Section } from '../components/Section'
import { Accordion, AccordionItem } from '../components/Accordion'
import { Button } from '../components/Button'
import { Link } from '../components/Link'
import { RevealOnScroll } from '../playground/RevealOnScroll'
import { GlyphBackground } from '../playground/GlyphBackground'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <Container>
      <HeroTagline
        tagline="Let's build together."
        cards={[
          {
            label: 'Who',
            color: 'green',
            content: 'A software engineer, educator, and advocate who believes technology is at its best when it brings people together.',
          },
          {
            label: 'What',
            color: 'warm',
            content: 'Speaking, teaching, community building, and creating content that helps developers grow at every level.',
          },
          {
            label: 'How',
            color: 'playful',
            content: 'With curiosity, collaboration, and the belief that meeting people where they are is the first step to going somewhere great.',
          },
        ]}
      />

      <RevealOnScroll>
        <Section zone="calm">
          <div className={styles.sectionWithGlyph}>
            <GlyphBackground glyph="A" top="-10px" right="-5px" />
            <Heading level={2}>Hello! I'm Andrew.</Heading>
            <Text>
              I'm a seasoned software engineer and educator seeking developer advocate opportunities
              where I can help others grow while learning new things and collaborating to tackle
              difficult problems. With experience spanning bootcamp instruction, senior software
              engineering, and community building, I bring a unique perspective to developer relations.
            </Text>
            <Text>
              My approach combines technical depth with genuine human connection. I've taught 500+
              students from zero coding background to shipping full-stack applications. I've written
              production code in Python, JavaScript, React, TypeScript, and Rust. I've given dozens
              of public talks through Toastmasters and technical conferences.
            </Text>
          </div>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <Section>
          <Heading level={2}>Featured Highlights</Heading>
          <Accordion>
            <AccordionItem title="Bootcamp Instructor & Software Engineer">
              <Text>
                Two years teaching full-stack web development at Prime Digital Academy, taking
                students from "what's a variable?" to shipping production applications for real
                clients. Specialized in PostgreSQL, Express, React, Node.js, and modern web technologies.
              </Text>
              <RouterLink to="/speaking">Learn more about my teaching experience</RouterLink>
            </AccordionItem>

            <AccordionItem title="Conference Speaker & Presenter">
              <Text>
                Featured talks include "From Passwords to Passkeys" at Minnebar 18 mainstage, plus
                dozens of technical and professional development presentations through Toastmasters
                and community events.
              </Text>
              <RouterLink to="/speaking">View my speaking portfolio</RouterLink>
            </AccordionItem>

            <AccordionItem title="Content Creator & Educator">
              <Text>
                Active YouTube channel with technical tutorials, blog at GrokThings.com exploring
                web development concepts, and consistent creation of educational materials for
                developers at all levels.
              </Text>
              <Text>
                <Link href="https://www.youtube.com/@grokthings" external>Watch my YouTube tutorials</Link>
                {' | '}
                <Link href="https://grokthings.com" external>Read my blog</Link>
              </Text>
            </AccordionItem>

            <AccordionItem title="Community Builder">
              <Text>
                Started and organized public play program at Fantasy Flight Game Center, served as
                Toastmasters Area Director, and consistently focus on creating welcoming spaces for
                learning and growth.
              </Text>
              <RouterLink to="/community">Learn about my community work</RouterLink>
            </AccordionItem>
          </Accordion>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <Section zone="warm">
          <Heading level={2}>What I Bring to Developer Relations</Heading>
          <ul className={styles.valueList}>
            <li><strong>Technical Credibility:</strong> Hands-on experience across the stack, from system design to deployment</li>
            <li><strong>Educational Excellence:</strong> Proven ability to create content that resonates with developers at all levels</li>
            <li><strong>Communication Skills:</strong> Years of public speaking training and practice through Toastmasters</li>
            <li><strong>Community Focus:</strong> Deep understanding of what makes developer communities thrive</li>
            <li><strong>Content Creation:</strong> Active production of tutorials, talks, articles, and educational materials</li>
            <li><strong>Authentic Personality:</strong> Genuine enthusiasm for technology and helping others succeed</li>
          </ul>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll delay={300}>
        <Section zone="playful" className={styles.ctaSection}>
          <Heading level={2}>Let's Connect</Heading>
          <Text>
            I'm actively seeking developer advocate roles where I can combine my passions for
            coding, community building, and helping others learn.
          </Text>
          <div className={styles.ctaButtons}>
            <RouterLink to="/connect"><Button>Get in Touch</Button></RouterLink>
            <RouterLink to="/portfolio"><Button variant="secondary">View My Work</Button></RouterLink>
          </div>
        </Section>
      </RevealOnScroll>
    </Container>
  )
}
