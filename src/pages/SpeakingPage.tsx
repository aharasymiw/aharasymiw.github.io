import { Link as RouterLink } from 'react-router-dom'
import { Container } from '../foundation/Container'
import { Heading } from '../foundation/Heading'
import { Text } from '../foundation/Text'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Accordion, AccordionItem } from '../components/Accordion'
import { Button } from '../components/Button'
import { Link } from '../components/Link'
import { RevealOnScroll } from '../playground/RevealOnScroll'
import styles from './SpeakingPage.module.css'

export function SpeakingPage() {
  return (
    <Container>
      <Section>
        <Heading level={1}>Speaking & Education</Heading>
        <Text>
          Great technical talks do more than convey information — they inspire action, challenge
          assumptions, and create connections. My approach combines deep technical knowledge with
          accessible explanations, ensuring both beginners and experts leave with valuable insights.
        </Text>
      </Section>

      <Section>
        <Heading level={2}>Featured Presentations</Heading>
        <div className={styles.talkGrid}>
          <RevealOnScroll>
            <Card glyph="K" header={
              <div>
                <Heading level={3} size="lg">From Passwords to Passkeys</Heading>
                <Text variant="label">Minnebar 18 &mdash; Mainstage (2024)</Text>
              </div>
            }>
              <Text>
                Delivered to a packed auditorium at Minnesota's largest technology unconference.
                Explored the journey from traditional passwords to modern passwordless authentication.
              </Text>
              <ul className={styles.topicList}>
                <li>WebAuthn and FIDO2 standards</li>
                <li>Implementation strategies for passkeys</li>
                <li>UX considerations in authentication</li>
                <li>Migration paths for existing apps</li>
              </ul>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <Card glyph="C" header={
              <div>
                <Heading level={3} size="lg">The World is More Complex Than We Think</Heading>
                <Text variant="label">2024</Text>
              </div>
            }>
              <Text>
                Challenging developers to embrace complexity rather than oversimplifying problems,
                leading to more robust and thoughtful solutions.
              </Text>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <Card glyph="R" header={
              <div>
                <Heading level={3} size="lg">Reflecting on My Path</Heading>
                <Text variant="label">2024</Text>
              </div>
            }>
              <Text>
                An honest exploration of career transitions, from mathematics to software engineering
                to education, and the lessons learned along the way.
              </Text>
            </Card>
          </RevealOnScroll>
        </div>
      </Section>

      <RevealOnScroll>
        <Section>
          <Heading level={2}>All Talks</Heading>
          <Accordion>
            <AccordionItem title="Professional Development">
              <div className={styles.talkList}>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">When to Say Yes! &mdash; The Art of Taking on New Projects</Heading>
                  <Text variant="muted">2022</Text>
                  <Text>Strategic advice for evaluating opportunities and managing professional growth.</Text>
                </div>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">I Want a Good, Clean Fight &mdash; How to Disagree Professionally</Heading>
                  <Text variant="muted">2022</Text>
                  <Text>Essential skills for navigating technical disagreements while maintaining positive relationships.</Text>
                </div>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">Bootstrapping Remote Leadership</Heading>
                  <Text variant="muted">2023</Text>
                  <Text>Candid discussion of leading remote teams, sharing both successes and ongoing challenges.</Text>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem title="Technical Deep Dives">
              <div className={styles.talkList}>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">The Life-Changing Magic of Bubbling Up</Heading>
                  <Text variant="muted">2021</Text>
                  <Text>Comprehensive exploration of error handling patterns in modern applications.</Text>
                </div>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">Digital Safety Practices</Heading>
                  <Text variant="muted">2023</Text>
                  <Text>Practical security guidance for developers and non-technical users.</Text>
                </div>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">Artisans of Code</Heading>
                  <Text variant="muted">2023</Text>
                  <Text>Exploring the craft of software development beyond mere functionality.</Text>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem title="Community & Culture">
              <div className={styles.talkList}>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">What I Do: Describing the Role of a Software Engineer</Heading>
                  <Text variant="muted">2022</Text>
                  <Text>Demystifying software engineering for non-technical audiences.</Text>
                </div>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">Zoom 2.0 &mdash; Best Practices, Tips, and Tricks</Heading>
                  <Text variant="muted">2021</Text>
                  <Text>Practical guidance for effective remote communication.</Text>
                </div>
                <div className={styles.talkEntry}>
                  <Heading level={4} size="base">Early Lessons in Leadership</Heading>
                  <Text variant="muted">2021</Text>
                  <Text>Insights from first leadership experiences and unexpected challenges.</Text>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Section zone="warm">
          <Heading level={2}>Teaching</Heading>
          <Text>
            I believe in meeting learners where they are and guiding them to where they want to be.
            My approach combines empathy, practical application, and continuous encouragement.
          </Text>

          <Heading level={3}>Prime Digital Academy</Heading>
          <Text>
            Full-time remote instructor teaching comprehensive full-stack web development to career
            changers with zero coding background. Guided 500+ students from "what is a variable?" to
            shipping production applications in just 20 weeks.
          </Text>

          <Heading level={3}>Content Creation</Heading>
          <Text>
            <Link href="https://www.youtube.com/@grokthings" external>YouTube channel</Link> with
            technical tutorials for developers at all levels, plus in-depth articles at{' '}
            <Link href="https://grokthings.com" external>GrokThings</Link> covering algorithms,
            JavaScript, architecture, and learning strategies.
          </Text>

          <Heading level={3}>Mentorship</Heading>
          <Text>
            One-on-one coaching, code review, career guidance, interview prep, and open source
            guidance. From college tutoring at UW-Milwaukee to mentoring bootcamp graduates.
          </Text>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Section zone="playful" className={styles.bookingSection}>
          <Heading level={2}>Book Me to Speak</Heading>
          <Text>
            I bring energy, expertise, and genuine enthusiasm to every speaking opportunity.
            Available for conferences, workshops, podcasts, webinars, meetups, and corporate training.
          </Text>
          <div className={styles.topicGrid}>
            <span className={styles.topicTag}>Modern Web Dev</span>
            <span className={styles.topicTag}>Authentication & Security</span>
            <span className={styles.topicTag}>Developer Education</span>
            <span className={styles.topicTag}>Career Transitions</span>
            <span className={styles.topicTag}>Remote Work</span>
            <span className={styles.topicTag}>Community Building</span>
            <span className={styles.topicTag}>Communication</span>
            <span className={styles.topicTag}>Bootcamp to Career</span>
          </div>
          <RouterLink to="/connect" style={{ textDecoration: 'none' }}>
            <Button>Contact Me</Button>
          </RouterLink>
        </Section>
      </RevealOnScroll>
    </Container>
  )
}
