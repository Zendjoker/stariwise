import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">How it works</p>
          <h2 id="how-heading">Four steps, no surprises.</h2>
        </Reveal>

        <ol className="steps">
          {[
            { n: "1", title: "Call or request a quote", body: "Tell us what you're moving, where, and when. A quick call or the form is all it takes." },
            { n: "2", title: "Get an upfront price", body: "We give you a clear rate with no hidden fees. The number we quote is the number you pay." },
            { n: "3", title: "Crew arrives on time", body: "A prepared, uniformed crew shows up when we say, with the gear the job needs." },
            { n: "4", title: "Pay when the job is done", body: "You settle up only after everything's in place and you're satisfied with the work." },
          ].map(({ n, title, body }) => (
            <Reveal key={n} as="li" className="step">
              <span className="step-num">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
