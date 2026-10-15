import { Link } from "react-router-dom";

// Plain facts about the app for anyone deciding whether to trust it, including app-store and
// Google sign-in reviewers: what it does, what signing in with Google shares, and where the
// policies live. Everything here is public; nothing on ontiver.com needs an account to read.
const facts = [
  {
    title: "What the app does",
    body: "Ontiver is a free identity wallet for iOS and Android. You verify your NIN, BVN or address once, keep the proof on your phone, and approve each time a bank or business asks to see it.",
  },
  {
    title: "Signing in with Google",
    body: "If you choose Sign in with Google, Ontiver receives only your name, email address and Google account ID, to create and sign in to your account. We never see your Google password or any other Google data.",
  },
  {
    title: "Your data stays yours",
    body: "We do not sell personal data or use it for advertising. You can download your data, revoke any share, or delete your account from the app at any time.",
  },
];

const AboutTheApp = () => (
  <section className="section-space bg-surface-muted" aria-labelledby="about-app-heading">
    <div className="site-container">
      <p className="eyebrow">About the Ontiver app</p>
      <h2 id="about-app-heading" className="section-heading mt-4 max-w-[720px]">
        A verified identity you carry, and share only when you approve.
      </h2>
      <div className="editorial-links mt-10">
        {facts.map(({ title, body }) => (
          <div key={title} className="editorial-link">
            <h3 className="text-card-title font-semibold">{title}</h3>
            <p className="mt-2 text-body text-[#526058]">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-body text-[#526058]">
        Read our{" "}
        <Link to="/privacy" className="font-semibold text-accent underline underline-offset-4">
          Privacy Policy
        </Link>
        ,{" "}
        <Link to="/terms" className="font-semibold text-accent underline underline-offset-4">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link
          to="/account-deletion"
          className="font-semibold text-accent underline underline-offset-4"
        >
          how to delete your account
        </Link>
        , or contact{" "}
        <a
          href="mailto:support@ontiver.com"
          className="font-semibold text-accent underline underline-offset-4"
        >
          support@ontiver.com
        </a>
        .
      </p>
    </div>
  </section>
);

export default AboutTheApp;
