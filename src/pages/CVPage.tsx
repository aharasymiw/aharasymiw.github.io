import { Container } from "../foundation/Container";
import { Heading } from "../foundation/Heading";
import { Text } from "../foundation/Text";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Accordion, AccordionItem } from "../components/Accordion";
import { RevealOnScroll } from "../playground/RevealOnScroll";
import styles from "./CVPage.module.css";

export function CVPage() {
  return (
    <Container>
      <Section>
        <Heading level={1}>CV</Heading>
        <Text>
          A snapshot of my professional journey — instructor, engineer, and lifelong learner. Grab
          the PDF below for a printable version, or read on for the highlights.
        </Text>
        <a
          className={styles.downloadButton}
          href="/andrew-harasymiw-resume.pdf"
          download="andrew-harasymiw-resume.pdf"
        >
          Download CV (PDF)
        </a>
      </Section>

      <Section>
        <Heading level={2}>Work Experience</Heading>
        <div className={styles.timeline}>
          <RevealOnScroll>
            <Card
              glyph="P"
              header={
                <div>
                  <Heading level={3} size="xl">
                    Prime Digital Academy
                  </Heading>
                  <Text variant="label">Software Engineer & Instructor</Text>
                  <Text variant="muted">February 2023 &ndash; June 2025 | Remote</Text>
                </div>
              }
            >
              <Text>
                Full-time remote instructor teaching comprehensive full-stack web development to
                career changers. Guided 500+ students from zero coding background to shipping
                production applications in 20 weeks.
              </Text>
              <Accordion>
                <AccordionItem title="Technical Stack">
                  <ul className={styles.techList}>
                    <li>
                      <strong>Frontend:</strong> HTML, CSS, JavaScript ES6+, React, MaterialUI,
                      Tailwind CSS, Vite
                    </li>
                    <li>
                      <strong>Backend:</strong> Node.js, Express, PostgreSQL, REST APIs
                    </li>
                    <li>
                      <strong>Auth:</strong> JWT, OAuth 2.0, WebAuthn
                    </li>
                    <li>
                      <strong>Quality:</strong> Unit testing, integration testing, CI/CD
                    </li>
                  </ul>
                </AccordionItem>
                <AccordionItem title="Key Achievements">
                  <ul className={styles.techList}>
                    <li>Successfully taught 500+ students from zero to full-stack</li>
                    <li>Developed high-quality curriculum materials and exercises</li>
                    <li>Facilitated real client projects solving business problems</li>
                    <li>Maintained consistently high student satisfaction ratings</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <Card
              glyph="A"
              header={
                <div>
                  <Heading level={3} size="xl">
                    Augeo Marketing
                  </Heading>
                  <Text variant="label">Senior Backend Software Engineer</Text>
                  <Text variant="muted">January 2022 &ndash; December 2022</Text>
                </div>
              }
            >
              <Text>
                Built backend services in Rust at a fast-moving startup, navigating an immature
                ecosystem while producing significant volumes of production code under tight
                timelines.
              </Text>
              <Accordion>
                <AccordionItem title="Details">
                  <ul className={styles.techList}>
                    <li>
                      <strong>Primary Language:</strong> Rust
                    </li>
                    <li>
                      <strong>Infrastructure:</strong> Docker, YAML configuration
                    </li>
                    <li>Delivered production-ready Rust code while learning the language</li>
                    <li>Established testing patterns that became team standards</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <Card
              glyph="S"
              header={
                <div>
                  <Heading level={3} size="xl">
                    SPS Commerce
                  </Heading>
                  <Text variant="muted">May 2016 &ndash; February 2022</Text>
                </div>
              }
            >
              <Text>
                Nearly six years progressing from consultant to software engineer, building tools
                that empower others and leading through influence.
              </Text>
              <Accordion>
                <AccordionItem title="Software Engineer (2021–2022)">
                  <Text>
                    Internal tooling and platform development with TypeScript, SuiteScript. Led
                    documentation governance and mentored junior developers.
                  </Text>
                </AccordionItem>
                <AccordionItem title="Associate Software Engineer (2019–2021)">
                  <Text>
                    Built automated data pipelines processing millions of records with Python, AWS,
                    Django, Snowflake. Reduced manual processing by 80%.
                  </Text>
                </AccordionItem>
                <AccordionItem title="Consultant (2016–2019)">
                  <Text>
                    Implemented EDI integrations for retail supply chain customers. Led small
                    distributed teams and built strong customer relationships through clear
                    communication.
                  </Text>
                </AccordionItem>
              </Accordion>
            </Card>
          </RevealOnScroll>
        </div>
      </Section>
    </Container>
  );
}
