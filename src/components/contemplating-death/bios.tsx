"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  cdSpeakers,
  getCdSpeaker,
  type SpeakerId,
} from "../../../content/contemplating-death";
import { Reveal } from "./motion-kit";

const BioContext = createContext<(id: SpeakerId) => void>(() => {});

export function useOpenBio() {
  return useContext(BioContext);
}

/** Owns the single biography dialog that speaker cards and the schedule both open. */
export function BioProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeId, setActiveId] = useState<SpeakerId>("omar");
  const speaker = getCdSpeaker(activeId);

  const open = useCallback((id: SpeakerId) => {
    setActiveId(id);
    dialogRef.current?.showModal();
  }, []);

  return (
    <BioContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="bio-dialog"
        aria-labelledby="bio-name"
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <form method="dialog">
          <button className="close-button" aria-label="Close biography">
            ×
          </button>
        </form>
        <Image src={speaker.image} width={104} height={104} alt="" />
        <h2 id="bio-name">{speaker.fullName}</h2>
        <p>{speaker.bio}</p>
      </dialog>
    </BioContext.Provider>
  );
}

export function SpeakerGrid() {
  const openBio = useOpenBio();
  return (
    <div className="speaker-grid">
      {cdSpeakers.map((speaker, index) => (
        <Reveal
          as="article"
          className="speaker"
          key={speaker.id}
          delay={index * 0.09}
        >
          <button
            type="button"
            data-bio={speaker.id}
            aria-haspopup="dialog"
            aria-label={`Read the bio of ${speaker.fullName}`}
            onClick={() => openBio(speaker.id)}
          >
            <span className="portrait-ring">
              <Image
                className="speaker-portrait"
                src={speaker.image}
                width={186}
                height={186}
                alt=""
              />
            </span>
            <span className="speaker-honorific">{speaker.honorific}</span>
            <span className="speaker-name">{speaker.name}</span>
            <span className="bio-link">
              Read bio <span aria-hidden="true">+</span>
            </span>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

export function SpeakerChip({ id }: { id: SpeakerId }) {
  const openBio = useOpenBio();
  const speaker = getCdSpeaker(id);
  return (
    <button
      type="button"
      className="session-speaker"
      data-bio={id}
      aria-haspopup="dialog"
      aria-label={`Read the bio of ${speaker.fullName}`}
      onClick={() => openBio(id)}
    >
      <Image
        className="speaker-portrait"
        src={speaker.image}
        width={52}
        height={52}
        alt=""
      />
      <span>{speaker.fullName}</span>
    </button>
  );
}

export function BioMention({ id }: { id: SpeakerId }) {
  const openBio = useOpenBio();
  const speaker = getCdSpeaker(id);
  return (
    <button
      type="button"
      className="bio-mention"
      aria-haspopup="dialog"
      aria-label={`Read the bio of ${speaker.fullName}`}
      onClick={() => openBio(id)}
    >
      {speaker.fullName}
    </button>
  );
}
