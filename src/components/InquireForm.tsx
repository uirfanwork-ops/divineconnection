"use client";

import { useState } from "react";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  options?: string[];
  placeholder?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  options,
  placeholder,
}: FieldProps) {
  const baseClasses =
    "mt-3 w-full border-0 border-b border-hairline bg-transparent py-3 font-display text-[20px] text-ink placeholder:text-mist/60 focus:border-clay focus:outline-none";

  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-nav text-mist">
        {label}
        {required ? " *" : ""}
      </span>
      {options ? (
        <select
          name={name}
          required={required}
          defaultValue=""
          className={baseClasses}
        >
          <option value="" disabled>
            Select
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          name={name}
          rows={5}
          required={required}
          placeholder={placeholder}
          className={baseClasses}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </label>
  );
}

export function InquireForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-hairline p-10 md:p-14">
        <p className="text-[11px] uppercase tracking-nav text-clay">Received</p>
        <p className="text-h3 mt-6 text-ink">
          Thank you. We will be in touch inside two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-10"
      onSubmit={handleSubmit}
      aria-label="Project inquiry"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <Field
        label="Project type"
        name="type"
        required
        options={[
          "Commercial",
          "Industrial",
          "Multi-unit residential",
          "Restaurant",
          "Pre-construction",
          "Other",
        ]}
      />

      <Field
        label="Approximate budget"
        name="budget"
        options={[
          "Under 500K",
          "500K to 2M",
          "2M to 5M",
          "5M to 20M",
          "Over 20M",
          "Undecided",
        ]}
      />

      <Field label="Location" name="location" placeholder="City, neighbourhood, or address" />

      <Field
        label="About the project"
        name="message"
        textarea
        required
        placeholder="Brief, site, schedule, lender, anything relevant."
      />

      <button
        type="submit"
        data-cursor="link"
        className="group inline-flex items-center gap-3 border border-ink px-10 py-4 text-[11px] uppercase tracking-nav text-ink transition-colors duration-300 hover:bg-ink hover:text-bone"
      >
        Send inquiry
        <span
          aria-hidden
          className="inline-block translate-y-[1px] transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </button>
    </form>
  );
}
