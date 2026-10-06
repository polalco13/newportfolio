import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications } from "@/data";

export default function Certifications() {
  return (
    <section
      className="certifications-section section-pad"
      id="certifications"
      aria-labelledby="certifications-title"
    >
      <div className="container">
        <div className="section-heading">
          <h2 id="certifications-title">Certifications.</h2>
        </div>
        <ul className="certifications-list">
          {certifications.map((certification) => (
            <li key={certification.credentialId}>
              <article className="certification-row">
                <div className="certification-mark" aria-hidden="true">
                  <BadgeCheck size={30} strokeWidth={1.5} />
                </div>
                <div className="certification-content">
                  <p className="certification-issuer">{certification.issuer}</p>
                  <h3>{certification.title}</h3>
                  <dl className="certification-meta">
                    <div>
                      <dt>Issued</dt>
                      <dd>
                        <time dateTime={certification.issuedAt}>
                          {certification.issuedLabel}
                        </time>
                      </dd>
                    </div>
                    <div>
                      <dt>Credential ID</dt>
                      <dd className="credential-id">
                        {certification.credentialId}
                      </dd>
                    </div>
                  </dl>
                </div>
                <a
                  className="certification-link"
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View credential for ${certification.title} (opens in a new tab)`}
                >
                  View credential <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
