import { Container } from "../foundation/Container";
import { Heading } from "../foundation/Heading";
import { Text } from "../foundation/Text";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Accordion, AccordionItem } from "../components/Accordion";
import { Link } from "../components/Link";
import { RevealOnScroll } from "../playground/RevealOnScroll";
import styles from "./PortfolioPage.module.css";

export function PortfolioPage() {
  return (
    <Container>
      <Section>
        <Heading level={1}>Portfolio</Heading>
        <Text>
          My career reflects a consistent thread: building systems that empower people. Whether
          writing production code, designing data pipelines, or teaching the next generation of
          developers, I focus on creating value through thoughtful engineering and clear
          communication.
        </Text>
      </Section>

      <Section>
        <Heading level={2}>Projects</Heading>
        <div className={styles.projectGrid}>
          <RevealOnScroll>
            <Card
              glyph="&lt;"
              header={
                <Heading level={3} size="lg">
                  Full-Stack Web Apps
                </Heading>
              }
            >
              <Text>
                Production applications with React, TypeScript, Node.js, PostgreSQL. Real-time data
                sync, PWA capabilities, and accessibility-first design.
              </Text>
              <Link href="https://github.com/aharasymiw" external>
                View on GitHub
              </Link>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <Card
              glyph="?"
              header={
                <Heading level={3} size="lg">
                  Developer Education Tools
                </Heading>
              }
            >
              <Text>
                Interactive learning platforms with code sandboxes, progress tracking, and
                collaborative pair programming features.
              </Text>
              <Link href="https://www.youtube.com/@grokthings" external>
                YouTube tutorials
              </Link>
              {" | "}
              <Link href="https://grokthings.com" external>
                Blog
              </Link>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <Card
              glyph="#"
              header={
                <Heading level={3} size="lg">
                  Open Source
                </Heading>
              }
            >
              <Text>
                Contributions across JavaScript, TypeScript, Python, and Rust. Documentation
                improvements, bug fixes, features, and mentoring new contributors.
              </Text>
              <Link href="https://github.com/aharasymiw" external>
                GitHub profile
              </Link>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <Card
              glyph="~"
              header={
                <Heading level={3} size="lg">
                  Homelab & Infrastructure
                </Heading>
              }
            >
              <Text>
                TrueNAS SCALE, Docker orchestration, Frigate NVR with Coral TPU, Prometheus/Grafana
                monitoring. Infrastructure as code in practice.
              </Text>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <Card
              glyph="%"
              header={
                <Heading level={3} size="lg">
                  Data Pipelines
                </Heading>
              }
            >
              <Text>
                Python/Pandas pipelines processing millions of records daily at SPS Commerce. BI
                dashboards that reduced manual processing by 80%.
              </Text>
            </Card>
          </RevealOnScroll>
        </div>
      </Section>

      <RevealOnScroll>
        <Section zone="calm">
          <Heading level={2}>Career Themes</Heading>
          <Accordion>
            <AccordionItem title="Building Tools That Empower Others">
              <Text>
                The best code I've written isn't impressive for its complexity — it's valuable
                because it solves real problems for real people.
              </Text>
            </AccordionItem>
            <AccordionItem title="Leading Through Influence">
              <Text>
                Much of my impact has come from leading without formal authority — sharing best
                practices, improving documentation, and mentoring colleagues.
              </Text>
            </AccordionItem>
            <AccordionItem title="Learning in Public">
              <Text>
                Whether picking up Rust quickly at Augeo or teaching concepts I'd just mastered at
                Prime, I believe in transparent learning and sharing the journey.
              </Text>
            </AccordionItem>
            <AccordionItem title="Communication as Core Skill">
              <Text>
                From consulting with retail customers to teaching complete beginners, I've learned
                to translate between technical and business stakeholders.
              </Text>
            </AccordionItem>
          </Accordion>
        </Section>
      </RevealOnScroll>
    </Container>
  );
}
