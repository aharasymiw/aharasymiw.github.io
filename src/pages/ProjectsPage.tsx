import { Container } from "../foundation/Container";
import { Heading } from "../foundation/Heading";
import { Text } from "../foundation/Text";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Link } from "../components/Link";
import { RevealOnScroll } from "../playground/RevealOnScroll";
import styles from "./ProjectsPage.module.css";

export function ProjectsPage() {
  return (
    <Container>
      <Section>
        <Heading level={1}>Recent Projects</Heading>
        <Text>
          A few things I've been building lately &mdash; some shipped, some still taking shape.
        </Text>
      </Section>

      <Section>
        <div className={styles.projectGrid}>
          <RevealOnScroll>
            <Card
              glyph="*"
              header={
                <Heading level={3} size="lg">
                  Darkhold
                </Heading>
              }
              footer={<span className={styles.statusBadge}>Private alpha</span>}
            >
              <Text>
                A project built around the Shadowdark RPG. It's in private alpha right now, so
                there's no public link yet.
              </Text>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <Card
              glyph="+"
              header={
                <Heading level={3} size="lg">
                  meet.aharasymiw.com
                </Heading>
              }
            >
              <Text>The easiest way to book time with me. Launching soon.</Text>
              <Link href="https://meet.aharasymiw.com" external>
                meet.aharasymiw.com
              </Link>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <Card
              glyph="~"
              header={
                <Heading level={3} size="lg">
                  Less Lately
                </Heading>
              }
            >
              <Text>A side project of mine, out in the world and live to visit.</Text>
              <Link href="https://www.lesslately.com" external>
                lesslately.com
              </Link>
            </Card>
          </RevealOnScroll>
        </div>
      </Section>
    </Container>
  );
}
