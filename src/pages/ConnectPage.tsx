import { Container } from '../foundation/Container'
import { Heading } from '../foundation/Heading'
import { Text } from '../foundation/Text'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Link } from '../components/Link'
import { RevealOnScroll } from '../playground/RevealOnScroll'
import styles from './ConnectPage.module.css'

export function ConnectPage() {
  return (
    <Container>
      <Section>
        <Heading level={1}>Let's Connect</Heading>
        <Text>
          I'm actively seeking developer advocate roles where I can combine my passions for
          coding, community building, and helping others learn. Whether you're looking for a
          speaker, content creator, community builder, or team member — I'd love to hear from you.
        </Text>
      </Section>

      <RevealOnScroll>
        <Section zone="warm">
          <Heading level={2}>What I'm Looking For</Heading>
          <Text>
            After years building systems, teaching developers, and growing communities, I'm ready
            to combine these experiences in developer advocacy. I want to work where I can:
          </Text>
          <ul className={styles.goalList}>
            <li>Create educational content that helps developers succeed</li>
            <li>Speak at conferences and community events</li>
            <li>Build inclusive developer communities</li>
            <li>Provide feedback that shapes products developers love</li>
            <li>Continue writing code while amplifying its impact through education</li>
          </ul>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Section>
          <Heading level={2}>Get in Touch</Heading>
          <div className={styles.contactGrid}>
            <Card glyph="@" header={<Heading level={3} size="base">Email</Heading>}>
              <Link href="mailto:aharasymiw@gmail.com">aharasymiw@gmail.com</Link>
            </Card>

            <Card header={<Heading level={3} size="base">GitHub</Heading>}>
              <Link href="https://github.com/aharasymiw" external>github.com/aharasymiw</Link>
            </Card>

            <Card header={<Heading level={3} size="base">LinkedIn</Heading>}>
              <Link href="https://www.linkedin.com/in/aharasymiw/" external>linkedin.com/in/aharasymiw</Link>
            </Card>

            <Card header={<Heading level={3} size="base">Mastodon</Heading>}>
              <Link href="https://hachyderm.io/@aharasymiw" external>hachyderm.io/@aharasymiw</Link>
            </Card>

            <Card header={<Heading level={3} size="base">YouTube</Heading>}>
              <Link href="https://www.youtube.com/@grokthings" external>@grokthings</Link>
            </Card>

            <Card header={<Heading level={3} size="base">Blog</Heading>}>
              <Link href="https://grokthings.com" external>grokthings.com</Link>
            </Card>
          </div>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Section zone="playful">
          <Heading level={2}>Services</Heading>
          <Text>
            I bring energy, expertise, and genuine enthusiasm to every opportunity. Available for:
          </Text>
          <div className={styles.serviceGrid}>
            <Card header={<Heading level={3} size="base">Speaking</Heading>}>
              <Text>Conference talks, keynotes, meetup presentations, webinars, and podcast appearances.</Text>
            </Card>
            <Card header={<Heading level={3} size="base">Workshops</Heading>}>
              <Text>Technical workshops, bootcamp modules, corporate training, and hands-on coding sessions.</Text>
            </Card>
            <Card header={<Heading level={3} size="base">Content</Heading>}>
              <Text>Technical writing, video tutorials, educational materials, and documentation.</Text>
            </Card>
            <Card header={<Heading level={3} size="base">Community</Heading>}>
              <Text>Community strategy, developer program design, event organizing, and advocacy.</Text>
            </Card>
            <Card header={<Heading level={3} size="base">DevRel</Heading>}>
              <Text>Fractional developer relations support, product feedback loops, and developer experience.</Text>
            </Card>
          </div>
        </Section>
      </RevealOnScroll>
    </Container>
  )
}
