"use client";

import { useRef } from "react";
import {
  cdAfternoonSessions,
  cdEvent,
  cdMorningSessions,
  type CdSession,
} from "../../../content/contemplating-death";
import { BioMention, SpeakerChip } from "./bios";
import { Reveal, TimelineRail } from "./motion-kit";

function SessionRow({ session, index }: { session: CdSession; index: number }) {
  return (
    <Reveal as="li" className="session" y={36}>
      <span className="session-index" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <div className="session-body">
        <h3>{session.title}</h3>
        {session.description ? <p>{session.description}</p> : null}
        {session.closingDuaBy ? (
          <p>
            Closing du’a led by <BioMention id={session.closingDuaBy} />.
          </p>
        ) : null}
      </div>
      <div className="session-speakers">
        {session.speakers.map((id) => (
          <SpeakerChip key={id} id={id} />
        ))}
      </div>
    </Reveal>
  );
}

export function Schedule() {
  const listRef = useRef<HTMLDivElement>(null);
  const [lunchTitle, ...lunchRest] = cdEvent.lunchNote.split(": ");

  return (
    <div className="timeline" ref={listRef}>
      <TimelineRail targetRef={listRef} />
      <ol>
        {cdMorningSessions.map((session, i) => (
          <SessionRow key={session.title} session={session} index={i + 1} />
        ))}
        <Reveal as="li" className="session session-break" y={36}>
          <span className="session-index" aria-hidden="true">
            Lunch
          </span>
          <div className="session-body">
            <h3>{lunchTitle}</h3>
            <p>{lunchRest.join(": ")}</p>
          </div>
        </Reveal>
        {cdAfternoonSessions.map((session, i) => (
          <SessionRow
            key={session.title}
            session={session}
            index={cdMorningSessions.length + i + 1}
          />
        ))}
      </ol>
    </div>
  );
}
