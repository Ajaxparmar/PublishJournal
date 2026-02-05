import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-80">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              International Journal of<br />
              Engineering Education
            </h2>
            <p className="text-lg md:text-xl text-blue-50 max-w-3xl mx-auto text-justify">
              The Journal of Engineering Education advances innovative global research in engineering knowledge, learning, and educational transformation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}