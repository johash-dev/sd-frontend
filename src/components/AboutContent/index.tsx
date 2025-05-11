import { FC } from 'react';

const AboutContent: FC = () => {
  return (
    <div className="h-full">
      <div className="mb-10">
        <h1 className="text-5xl">Smarter Estimations with ScrumDeck</h1>
        <p className="text-gray-400">
          Turn ambiguity into clarity, one vote at a time.
        </p>
      </div>
      <div className="mb-6 bg-[#010409] border border-[#3D444D] rounded-lg p-5">
        <p>
          Poker Estimation is a collaborative technique used by agile teams to
          estimate effort, complexity, or risk for user stories. Inspired by
          Planning Poker, this tool helps your team:
        </p>
        <ul className="list-disc pl-9 mt-7">
          <li>
            <p>Share individual insights without bias</p>
          </li>
          <li>
            <p>Align on realistic expectations</p>
          </li>
          <li>
            <p>Reach consensus faster</p>
          </li>
          <li>
            <p>Foster open and fun discussions</p>
          </li>
        </ul>
      </div>
      <section>
        <h2 className="text-2xl">Why use our tool?</h2>
        <p className="text-gray-400">
          Because it’s not just about numbers—it’s about better conversations,
          confident planning, and empowered teams.
        </p>
      </section>
    </div>
  );
};

export default AboutContent;
