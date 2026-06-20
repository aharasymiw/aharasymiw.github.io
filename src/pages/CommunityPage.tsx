import { Container } from "../foundation/Container";
import { Heading } from "../foundation/Heading";
import { Text } from "../foundation/Text";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Accordion, AccordionItem } from "../components/Accordion";
import { RevealOnScroll } from "../playground/RevealOnScroll";
import { D20Tumble } from "../playground/D20Tumble";
import styles from "./CommunityPage.module.css";

export function CommunityPage() {
  return (
    <Container>
      <Section>
        <Heading level={1}>Community</Heading>
        <Text>
          Beyond technology, I'm passionate about creating inclusive communities where everyone can
          contribute. Whether through public speaking events, gaming communities, or mentoring, I
          focus on lowering barriers and amplifying voices.
        </Text>
      </Section>

      <RevealOnScroll>
        <Section zone="calm">
          <Heading level={2}>Toastmasters</Heading>
          <Text>
            Since 2016, I've dedicated thousands of hours to honing my communication skills,
            mentoring others, and leading at both club and area levels through Toastmasters
            International.
          </Text>

          <Accordion>
            <AccordionItem title="Area Director (2021–2022)">
              <Text>
                Oversaw 4–5 clubs with over 80 total members. Organized area-level speech contests
                and training events, conducted club visits, and achieved Distinguished Area
                recognition.
              </Text>
            </AccordionItem>
            <AccordionItem title="Club President (2020–2021)">
              <Text>
                Led our club through the pandemic transition to virtual meetings, maintaining member
                engagement and growing membership during uncertain times.
              </Text>
            </AccordionItem>
            <AccordionItem title="Club Secretary (2018–2019)">
              <Text>
                Managed club administration and communications, ensuring smooth operations and new
                member onboarding.
              </Text>
            </AccordionItem>
            <AccordionItem title="Officer Mentor (2022–Present)">
              <Text>
                Ongoing guidance to new club officers, sharing best practices and helping them
                navigate leadership challenges.
              </Text>
            </AccordionItem>
          </Accordion>

          <div className={styles.skillsGrid}>
            <Card
              header={
                <Heading level={3} size="base">
                  Communication
                </Heading>
              }
            >
              <ul className={styles.skillList}>
                <li>Clarity and structure</li>
                <li>Audience engagement</li>
                <li>Storytelling</li>
                <li>Vocal variety</li>
              </ul>
            </Card>
            <Card
              header={
                <Heading level={3} size="base">
                  Leadership
                </Heading>
              }
            >
              <ul className={styles.skillList}>
                <li>Vision setting</li>
                <li>Team building</li>
                <li>Conflict resolution</li>
                <li>Volunteer management</li>
              </ul>
            </Card>
            <Card
              header={
                <Heading level={3} size="base">
                  Evaluation
                </Heading>
              }
            >
              <ul className={styles.skillList}>
                <li>Active listening</li>
                <li>Constructive feedback</li>
                <li>Recognition</li>
                <li>Coaching</li>
              </ul>
            </Card>
          </div>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Section zone="playful">
          <Heading level={2}>
            Tabletop RPGs & <D20Tumble>Community Building</D20Tumble>
          </Heading>
          <Text>
            At their core, tabletop role-playing games like{" "}
            <D20Tumble>Dungeons & Dragons</D20Tumble> are about collaborative storytelling, creative
            problem-solving, and building connections. For over a decade, I've used TTRPGs as a
            vehicle for community building, teaching, and creating welcoming spaces.
          </Text>

          <Accordion>
            <AccordionItem title="Dungeon Master (2014–Present)">
              <Text>
                Running games for diverse audiences — from complete beginners to experienced
                players. My approach focuses on player-centered storytelling, inclusive tables,
                teaching through play, improvisation, and shared narrative authority.
              </Text>
              <Text>
                Primary system: <D20Tumble>D&D 5e</D20Tumble>, plus Pathfinder, indie systems, and
                convention one-shots.
              </Text>
            </AccordionItem>

            <AccordionItem title="Fantasy Flight Game Center Organized Play (2016–2018)">
              <Text>
                Founded a weekly public play program that introduced hundreds of people to organized{" "}
                <D20Tumble>tabletop RPG</D20Tumble> play. Recruited and trained volunteer DMs,
                created a DM pipeline from players to experienced game masters, and built an engaged
                community.
              </Text>
              <Heading level={3} size="sm">
                Community Lessons
              </Heading>
              <ul className={styles.lessonList}>
                <li>
                  <strong>Lower the barrier to entry</strong> &mdash; Make it easy for newcomers
                </li>
                <li>
                  <strong>Create leadership pathways</strong> &mdash; Help members grow into leaders
                </li>
                <li>
                  <strong>Set clear expectations</strong> &mdash; Explicit guidelines prevent
                  problems
                </li>
                <li>
                  <strong>Celebrate contributions</strong> &mdash; Recognition motivates engagement
                </li>
                <li>
                  <strong>Listen and adapt</strong> &mdash; Communities evolve based on member needs
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Charitable Fundraising (2017–2020)">
              <Text>
                Organized gaming events raising funds for Gillette Children's Hospital through
                public gamedays and convention appearances. Coordinated multi-table events,
                recruited volunteers, and showed how hobby communities can drive meaningful impact.
              </Text>
            </AccordionItem>

            <AccordionItem title="Adventurers League (2016–Present)">
              <Text>
                Consistently run public play campaigns including{" "}
                <D20Tumble>D&D's official organized play program</D20Tumble>. Hosting regular
                sessions, managing drop-in players, and creating memorable experiences within
                structured constraints.
              </Text>
            </AccordionItem>
          </Accordion>
        </Section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Section zone="warm">
          <Heading level={2}>Where It All Connects</Heading>
          <Text>
            Running <D20Tumble>tabletop RPGs</D20Tumble> might seem disconnected from software
            development, but the skills overlap significantly. Facilitation, teaching complex
            systems, improvisation, community building, and storytelling — these are the same skills
            that power developer advocacy.
          </Text>
          <div className={styles.overlapGrid}>
            <Card
              header={
                <Heading level={3} size="base">
                  Facilitation
                </Heading>
              }
            >
              <Text>
                Managing group dynamics, ensuring everyone participates, reading the room and
                adjusting on the fly.
              </Text>
            </Card>
            <Card
              header={
                <Heading level={3} size="base">
                  Teaching
                </Heading>
              }
            >
              <Text>
                Breaking complex systems into chunks, scaffolded learning, knowing when to simplify
                vs. introduce nuance.
              </Text>
            </Card>
            <Card
              header={
                <Heading level={3} size="base">
                  Improvisation
                </Heading>
              }
            >
              <Text>
                Responding to the unexpected while maintaining coherence — whether debugging or
                adapting a talk.
              </Text>
            </Card>
            <Card
              header={
                <Heading level={3} size="base">
                  Community
                </Heading>
              }
            >
              <Text>
                Cultivating inclusive spaces, developing leadership pipelines, enabling organic
                community growth.
              </Text>
            </Card>
          </div>
        </Section>
      </RevealOnScroll>
    </Container>
  );
}
